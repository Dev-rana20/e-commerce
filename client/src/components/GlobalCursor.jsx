import React, { useEffect, useRef, useState } from 'react';

const GlobalCursor = () => {
  const bottleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const bottlePos = useRef({ x: 0, y: 0 });
  
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') || 
        target.closest('.product-card') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovered(!!isInteractive);
      setTilt(isInteractive ? 15 : 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    let animationFrameId;

    const updatePosition = () => {
      // Lerp follow logic for a smooth floaty feel (0.1 lerp factor)
      bottlePos.current.x += (mouse.current.x - bottlePos.current.x) * 0.1;
      bottlePos.current.y += (mouse.current.y - bottlePos.current.y) * 0.1;

      if (bottleRef.current) {
        bottleRef.current.style.transform = `translate3d(${bottlePos.current.x}px, ${bottlePos.current.y}px, 0) translate(-50%, -50%) scale(${
          clicked ? 0.5 : hovered ? 0.75 : 0.6
        }) rotate(${tilt}deg)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible, hovered, clicked, tilt]);

  if (!visible) return null;

  return (
    <div
      ref={bottleRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform hidden md:block"
      style={{
        transform: `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Royal Burgundy & Gold Perfume Bottle SVG */}
      <svg
        width="28"
        height="36"
        viewBox="0 0 28 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(88,24,31,0.3)]"
      >
        {/* Bottle Cap */}
        <rect
          x="10"
          y="2"
          width="8"
          height="7"
          rx="1.5"
          fill="#2D2B29"
          stroke="#58181F"
          strokeWidth="1.5"
        />
        {/* Gold Neck */}
        <rect
          x="12"
          y="9"
          width="4"
          height="2"
          fill="#C8A34A"
        />
        {/* Glass Bottle Body */}
        <rect
          x="3"
          y="11"
          width="22"
          height="23"
          rx="3"
          fill="rgba(252, 250, 247, 0.9)"
          stroke="#58181F"
          strokeWidth="1.8"
        />
        {/* Burgundy Liquid level inside bottle */}
        <path
          d="M 4 21 Q 14 18 24 21 L 24 31 Q 14 33 4 31 Z"
          fill="rgba(88, 24, 31, 0.35)"
        />
        {/* Perfume Brand Miniature Label */}
        <rect
          x="7"
          y="16"
          width="14"
          height="10"
          fill="#FAF6F0"
          stroke="#C8A34A"
          strokeWidth="0.8"
        />
        <line
          x1="9"
          y1="21"
          x2="19"
          y2="21"
          stroke="#58181F"
          strokeWidth="1"
        />
        {/* Shine lines */}
        <path
          d="M 6 13 L 6 31"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GlobalCursor;
