import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kelys_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kelys_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size = '100ml') => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedSize: size }];
      }
    });
    setCartOpen(true); // Auto-open cart drawer when adding item
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId, size, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const idx = newCart.findIndex(
        (item) => item.product.id === productId && item.selectedSize === size
      );
      if (idx > -1) {
        newCart[idx].quantity = qty;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
