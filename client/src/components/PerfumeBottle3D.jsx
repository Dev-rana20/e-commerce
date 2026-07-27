import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Interactive component inside the canvas
const InteractiveBottle = () => {
  const groupRef = useRef();
  const bottleRef = useRef();
  
  // Drag rotation state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  // Track mouse coordinates for parallax
  const mouse = useRef({ x: 0, y: 0 });

  // Add scroll positioning
  const scrollY = useRef(0);

  // Load the 3D model
  const { nodes } = useGLTF('/scarlet perfume.glb');

  // Customize and clone the bottle model
  const model = useMemo(() => {
    if (!nodes || !nodes['Perfume']) return null;

    const bottleGroup = nodes['Perfume'].clone();

    bottleGroup.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = child.material?.name?.toLowerCase() || '';
        const nodeName = child.name?.toLowerCase() || '';

        // Modify parameters directly on loaded materials to preserve normal maps & textures
        if (child.material) {
          child.material = child.material.clone();

          if (matName.includes('glass red') || nodeName.includes('inside') || matName.includes('glass red.001')) {
            // Scarlet red liquid physical properties
            child.material.color.set('#9C0F1E');
            child.material.transmission = 0.95;
            child.material.roughness = 0.04;
            child.material.thickness = 0.15;
            child.material.ior = 1.35;
            child.material.envMapIntensity = 3.0;
            child.material.transparent = true;
            child.material.opacity = 0.85;
            if (child.material.attenuationColor) {
              child.material.attenuationColor.set('#9C0F1E');
              child.material.attenuationDistance = 0.3;
            }
          } else if (matName.includes('brass') || matName.includes('gold') || nodeName.includes('middle') || nodeName.includes('scarlet')) {
            // Gold metal properties
            child.material.metalness = 0.98;
            child.material.roughness = 0.12;
            child.material.envMapIntensity = 3.5;
          } else if (matName.includes('glass clean') || nodeName.includes('down')) {
            // Clear glass bottle properties
            child.material.color.set('#ffffff');
            child.material.transmission = 0.98;
            child.material.roughness = 0.03;
            child.material.thickness = 0.25;
            child.material.ior = 1.52;
            child.material.clearcoat = 1.0;
            child.material.clearcoatRoughness = 0.05;
            child.material.envMapIntensity = 3.5;
            child.material.transparent = true;
          }
        }
      }
    });

    // Compute bounding box and center/scale the bottle dynamically
    const box = new THREE.Box3().setFromObject(bottleGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Scale the bottle to fit a height of ~1.85 units (making it slightly smaller)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 1.85 / maxDim;
    
    bottleGroup.scale.setScalar(scaleFactor);
    bottleGroup.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    );

    return bottleGroup;
  }, [nodes]);

  // Set up event listeners
  React.useEffect(() => {
    const handleMouseDown = (e) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragRotation.current = { x: targetRotation.current.x, y: targetRotation.current.y };
    };

    const handleMouseMove = (event) => {
      // Parallax tracking when not dragging
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging.current) return;
      const deltaX = event.clientX - dragStart.current.x;
      const deltaY = event.clientY - dragStart.current.y;

      const sensitivity = 0.006;
      targetRotation.current.y = dragRotation.current.y + deltaX * sensitivity;
      targetRotation.current.x = dragRotation.current.x + deltaY * sensitivity;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    // Touch support for mobile dragging
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragRotation.current = { x: targetRotation.current.x, y: targetRotation.current.y };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

      if (!isDragging.current) return;
      const deltaX = e.touches[0].clientX - dragStart.current.x;
      const deltaY = e.touches[0].clientY - dragStart.current.y;

      const sensitivity = 0.008;
      targetRotation.current.y = dragRotation.current.y + deltaX * sensitivity;
      targetRotation.current.x = dragRotation.current.x + deltaY * sensitivity;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Frame loop for rendering animations
  useFrame((state) => {
    if (!groupRef.current) return;

    // Smoothly lerp towards target rotation (accumulated drag + auto-rotation + subtle parallax)
    if (!isDragging.current) {
      targetRotation.current.y += 0.0035; // Slow auto-rotation spin
      const parallaxX = mouse.current.x * 0.15;
      const parallaxY = mouse.current.y * 0.1;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotation.current.y + parallaxX, 
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        targetRotation.current.x + parallaxY, 
        0.05
      );
    } else {
      // Direct drag rotation response
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotation.current.y, 
        0.15
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        targetRotation.current.x, 
        0.15
      );
    }

    // 2. Scroll-based rotation & positioning
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY.current / maxScroll : 0;
    
    // Rotate bottle as user scrolls
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z, 
      scrollPercent * Math.PI * 0.5, 
      0.03
    );
    
    // Subtle float translation on Y
    if (bottleRef.current) {
      bottleRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12;
    }
  });

  // Dynamic texture for the luxury label
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Save state
    ctx.save();
    
    // Clean champagne background
    ctx.fillStyle = '#FAF6F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Flip context horizontally to compensate for WebGL texture mirroring
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    // Polished gold border (thinner, more elegant)
    ctx.strokeStyle = '#C8A34A';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Inner thin border
    ctx.strokeStyle = '#C8A34A';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    
    // Brand Name text with correct accent KÉLYS
    ctx.fillStyle = '#2D2B29';
    ctx.font = "normal 55px 'Cormorant Garamond', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KÉLYS', canvas.width / 2, canvas.height / 2 - 20);
    
    // Sub-details
    ctx.fillStyle = '#706B63';
    ctx.font = "500 13px 'Inter', sans-serif";
    ctx.letterSpacing = '10px';
    ctx.fillText('N O C T U R N E', canvas.width / 2, canvas.height / 2 + 35);
    
    ctx.fillStyle = '#C8A34A';
    ctx.font = "italic 11px 'Cormorant Garamond', serif";
    ctx.fillText('EXTRAIT DE PARFUM', canvas.width / 2, canvas.height / 2 + 65);
    
    // Restore state
    ctx.restore();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={bottleRef}>
        {model && <primitive object={model} />}

        {/* Legacy 2D label plane commented out to prevent clipping with the 3D embossed text 'Scarlet' */}
        {/* <mesh position={[0, -0.15, 0.51]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 0.28]} />
          <meshStandardMaterial
            map={labelTexture}
            roughness={0.3}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh> */}
      </group>
    </group>
  );
};

// Particle background system inside Canvas
const FloatingParticles = ({ count = 65 }) => {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const speedArr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;     // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
      speedArr[i] = 0.1 + Math.random() * 0.35;
    }
    return [arr, speedArr];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Move particles slowly upwards
      pos[i * 3 + 1] += speeds[i] * delta;
      // Wrap particles back when they go out of bounds
      if (pos[i * 3 + 1] > 4) {
        pos[i * 3 + 1] = -4;
      }
      // Sway slightly
      pos[i * 3] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.001;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C8A34A"
        size={0.022}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const PerfumeBottle3D = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        className="w-full h-full z-10"
      >
        <ambientLight intensity={0.6} />
        
        {/* Main front key light with shadow casting */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={2.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Soft opposite fill light */}
        <directionalLight
          position={[-5, 3, 5]}
          intensity={1.2}
          color="#FFF3E0"
        />
        
        {/* Golden rim backlight to make glass borders pop */}
        <directionalLight
          position={[0, 5, -5]}
          intensity={4.0}
          color="#FFE082"
        />
        
        {/* Top down spotlight for cap glares */}
        <spotLight
          position={[0, 6, 0]}
          intensity={3.0}
          angle={Math.PI / 4}
          penumbra={1}
          color="#ffffff"
        />
        
        {/* Uplift golden point light */}
        <pointLight
          position={[0, -4, 2]}
          intensity={2.0}
          color="#C8A34A"
          distance={10}
        />

        {/* 3D Bottle component */}
        <Suspense fallback={null}>
          <InteractiveBottle />
        </Suspense>

        {/* Particles */}
        <FloatingParticles count={70} />

        {/* Environment map for realistic glass/metal reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/scarlet perfume.glb');

export default PerfumeBottle3D;
