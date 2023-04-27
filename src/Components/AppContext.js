import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedItems) {
      setCartItems(storedItems);
    }
  }, []);

  // const addItem = (item) => {
  //   setCartItems(item);
  //   localStorage.setItem("cartItems", JSON.stringify(item));
  // };

  const addItem = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.product.id === item.product.id &&
        cartItem.selectedsize === item.selectedsize
    );

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const newCartItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
    }
  };

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
