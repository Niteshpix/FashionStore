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
    const updatedCartLines = cartItems.lines.edges.filter(
      (line) => line.node.merchandise.id !== lineItemId
    );
    deleteCartItem(lineItemId, cartId)
      .then((data) => {
        console.log("Item deleted:", data);
        // update the UI or perform any additional actions
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        // handle the error or display an error message to the user
      });

    setCartItems({ lines: { edges: updatedCartLines } });
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
