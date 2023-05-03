import { createContext, useState, useEffect } from "react";
import {
  deleteCartItem,
  getCheckoutUrl,
  retrieveCart,
} from "../../utils/shopify";

export const getCartData = async (cartId) => {
  if (cartId) {
    try {
      const cartData = await retrieveCart(cartId);
      const checkoutUrl = await getCheckoutUrl(cartId);
      return {
        cartItems: cartData,
        checkoutUrl: checkoutUrl,
      };
    } catch (error) {
      console.error(error);
      return {
        cartItems: [],
        checkoutUrl: "",
      };
    }
  }
  return {
    cartItems: [],
    checkoutUrl: "",
  };
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    const cartId = sessionStorage.getItem("cartId");
    getCartData(cartId)
      .then((data) => {
        if (data) {
          setCartItems(data.cartItems);
          setCheckoutUrl(data.checkoutUrl);
        } else {
          setCartItems([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addItem = () => {
    const cartId = sessionStorage.getItem("cartId");
    getCartData(cartId).then((data) => {
      if (data) {
        setCartItems(data.cartItems);
        setCheckoutUrl(data.checkoutUrl);
      }
    });
  };

  const removeItem = (lineItemId) => {
    const cartId = sessionStorage.getItem("cartId");
    deleteCartItem(cartId, lineItemId)
      .then((data) => {
        const updatedLines = data.cartLinesRemove.cart.lines.edges.filter(
          ({ node }) => node.id !== lineItemId
        );

        const updatedCart = {
          ...data,
          lines: { edges: updatedLines },
        };
        setCartItems(updatedCart);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        setCartItems,
        checkoutUrl,
        setCheckoutUrl,
        getCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
