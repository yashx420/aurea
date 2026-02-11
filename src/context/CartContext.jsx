import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem("aurea_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aurea_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (experience, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === experience.id);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.id === experience.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...experience, quantity }];
      }
    });
  };

  const removeFromCart = (experienceId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== experienceId),
    );
  };

  const updateQuantity = (experienceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(experienceId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === experienceId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
