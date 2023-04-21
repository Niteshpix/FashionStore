import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load the cart from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  // Save the cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AppContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </AppContext.Provider>
  );
};
