import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import Link from "next/link";
import { CartContext } from "../AppContext";
import { useRouter } from "next/router";
import { updateProductQuantity } from "../../../utils/shopify";
import formatPrice from "../../../utils/helpers";

function Header() {
  const { cartItems, removeItem, checkoutUrl, setCartItems } =
    useContext(CartContext);
  const [sliderOpen, setSliderOpen] = useState(false);
  const router = useRouter();
  let lines = cartItems?.lines?.edges;
  let checkout_Url = checkoutUrl?.cart?.checkoutUrl;
  const [token, setToken] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token !== null);
  }, [token]);

  const subTotalPrice = lines?.reduce((total, line) => {
    const price = parseFloat(line.node.merchandise.price.amount);
    return total + price * line.node.quantity;
  }, 0);

  const totalQuantity = lines?.reduce((total, line) => {
    return total + line.node.quantity;
  }, 0);

  function toggleSlider() {
    setSliderOpen(!sliderOpen);
  }
  function closeSlider() {
    setSliderOpen(false);
  }

  const handleRoute = async () => {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      router.push("/account/login");
    } else {
      router.push({
        pathname: checkout_Url,
      });
    }

    setSliderOpen(false);
  };

  useEffect(() => {
    const slider = document.getElementById("slider");
    if (sliderOpen) {
      slider.style.width = "23%";
      slider.style.right = "0";
    } else {
      slider.style.width = "0%";
      slider.style.right = "-30%";
    }
  }, [sliderOpen]);

  const handleDecrement = (lineIds, currentQuantity) => {
    let cartId = sessionStorage.getItem("cartId");
    let newqty = currentQuantity - 1;
    updateProductQuantity(cartId, lineIds, newqty).then((updatedCart) => {
      const updatedLineItem = updatedCart.cartLinesUpdate.cart.lines.edges.find(
        (edge) => edge.node.id === lineIds
      );
      const lineItemIndex = cartItems.lines.edges.findIndex(
        (edge) => edge.node.id === lineIds
      );
      const updatedCartItems = {
        ...cartItems,
        lines: {
          edges: [
            ...cartItems.lines.edges.slice(0, lineItemIndex),
            {
              node: {
                ...cartItems.lines.edges[lineItemIndex].node,
                quantity: updatedLineItem.node.quantity,
              },
            },
            ...cartItems.lines.edges.slice(lineItemIndex + 1),
          ],
        },
      };

      setCartItems(updatedCartItems);
    });
  };

  const handleIncrement = (lineIds, currentQuantity) => {
    let cartId = sessionStorage.getItem("cartId");
    let newqty = currentQuantity + 1;
    updateProductQuantity(cartId, lineIds, newqty).then((updatedCart) => {
      // Find the updated line item in the cartItems array and update its quantity
      const updatedLineItem = updatedCart.cartLinesUpdate.cart.lines.edges.find(
        (edge) => edge.node.id === lineIds
      );
      const lineItemIndex = cartItems.lines.edges.findIndex(
        (edge) => edge.node.id === lineIds
      );
      const updatedCartItems = {
        ...cartItems,
        lines: {
          edges: [
            ...cartItems.lines.edges.slice(0, lineItemIndex),
            {
              node: {
                ...cartItems.lines.edges[lineItemIndex].node,
                quantity: updatedLineItem.node.quantity,
              },
            },
            ...cartItems.lines.edges.slice(lineItemIndex + 1),
          ],
        },
      };

      setCartItems(updatedCartItems);
    });
  };
  const handleRoutes = () => {
    if (token) {
      router.push("/account");
    } else {
      router.push("/account/login");
    }
  };

  return (
    <div>
      <p className={styles.announcementbar}>
        <span>Welcome to our store</span>
      </p>
      <Navbar className={styles.navbar}>
        <Navbar.Brand as={Link} href="/" passHref>
          <h2 style={{ color: "black", fontSize: "32px", fontWeight: "bold" }}>
            FashionStore
          </h2>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/" passHref active>
            Home
          </Nav.Link>
          <Nav.Link as={Link} href="/catalog" passHref>
            Catalog
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <BsSearch className={styles.searchIcon} />
          <HiOutlineShoppingBag
            className={`${styles.searchIcon} ${styles.searchIconWithMargin}`}
            onClick={() => toggleSlider()}
          />
          <span>{lines && lines.length >= "1" ? totalQuantity : ""}</span>

          <HiOutlineUser
            className={`${styles.searchIcon} ${styles.searchIconWithMargin}`}
            onClick={() => handleRoutes()}
          />

          <div id="slider">
            <button className="crossbtn" onClick={closeSlider}>
              X
            </button>
            <div className="bagdetails">
              <h5>Your bag</h5>
              {lines?.length === 0 || lines === undefined ? (
                <div style={{ textAlign: "center", marginTop: "52%" }}>
                  <p>Your bag is empty</p>
                  <Nav.Link as={Link} href="/catalog" passHref>
                    Continue shopping
                  </Nav.Link>
                </div>
              ) : (
                lines?.map((items, i) => {
                  let imgurl = items.node.merchandise.image.originalSrc;
                  let price = items.node.merchandise.price.amount;
                  let lineIds = items.node.id;
                  let qty = items.node.quantity;
                  return (
                    <div className="row mt-4" key={i}>
                      <div className="col-3">
                        <img
                          src={imgurl}
                          alt="image"
                          style={{ height: "150px", width: "100px" }}
                        />
                      </div>
                      <div className="col-9">
                        <span>{items.node.merchandise.product.handle}</span>
                        <p>Selected size: {items.node.merchandise.title}</p>
                        <p>{formatPrice(price)}</p>
                        <div>
                          <button
                            disabled={qty === 1}
                            onClick={() => handleDecrement(lineIds, qty)}
                          >
                            -
                          </button>
                          <span>{qty}</span>
                          <button onClick={() => handleIncrement(lineIds, qty)}>
                            +
                          </button>

                          <button
                            className="crossbtn"
                            onClick={() => removeItem(lineIds)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                  textAlign: "center",
                  fontStyle: "italic",
                  padding: "8px",
                  marginTop: "10vh",
                }}
              >
                Your order qualifies for free shipping!
              </div>

              {lines?.length === 0 || lines === undefined ? (
                ""
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Subtotal</span>
                  <p>{formatPrice(subTotalPrice)}</p>
                </div>
              )}

              {lines?.length == 0 || lines === undefined ? (
                ""
              ) : (
                <button
                  className={"checkoutbtn"}
                  type="submit"
                  onClick={() => handleRoute()}
                >
                  CHECK OUT
                </button>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
