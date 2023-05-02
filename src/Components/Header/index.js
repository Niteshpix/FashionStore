import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
import { CartContext } from "../AppContext";
import { useRouter } from "next/router";
import formatPrice from "@/config/utils";

function Header() {
  const { cartItems, removeItem, setCartItems, checkoutUrl, setCheckoutUrl } =
    useContext(CartContext);
  const [sliderOpen, setSliderOpen] = useState(false);
  const router = useRouter();
  let lines = cartItems?.lines?.edges;
  let checkout_Url = checkoutUrl?.cart?.checkoutUrl;

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
    router.push({
      pathname: checkout_Url,
    });
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

  const handleDecrement = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    const cartItemsString = updatedCartItems
      .map((item, index) => {
        const variant = item.selectedItems[index];
        return `${variant.id}:${item.quantity}`;
      })
      .join(",");

    const url = `https://fashionstroe.myshopify.com/cart/${cartItemsString}`;
    setCheckoutUrl(url);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    const cartItemsString = updatedCartItems
      .map((item, index) => {
        const variant = item.selectedItems[index];
        return `${variant.id}:${item.quantity}`;
      })
      .join(",");

    setCartItems(updatedCartItems);
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
          <Nav.Link as={Link} href="/contact" passHref>
            Contact
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <BsSearch className={styles.searchIcon} />
          <HiOutlineShoppingBag
            className={`${styles.searchIcon} ${styles.searchIconWithMargin}`}
            onClick={() => toggleSlider()}
          />
          <span>{lines?.length >= "1" ? totalQuantity : ""}</span>
          <div id="slider">
            <button className="crossbtn" onClick={closeSlider}>
              X
            </button>
            <div className="bagdetails">
              <h5>Your bag</h5>
              {lines?.length === 0 ? (
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
                        <span>{items?.node.merchandise.product?.title}</span>
                        <p>Selected size: {items?.selectedsize}</p>
                        <p>{formatPrice(price)}</p>
                        <div>
                          <button
                            disabled={items.quantity === 1}
                            onClick={() => handleDecrement(i)}
                          >
                            -
                          </button>
                          <span>{items.node.quantity}</span>
                          <button onClick={() => handleIncrement(i)}>+</button>

                          <button
                            className="crossbtn"
                            onClick={() =>
                              removeItem(items.node.merchandise.id)
                            }
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

              {lines?.length !== 0 ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Subtotal</span>
                  <p>{formatPrice(subTotalPrice)}</p>
                </div>
              ) : (
                ""
              )}

              {lines?.length !== 0 ? (
                <button
                  className={"checkoutbtn"}
                  type="submit"
                  onClick={() => handleRoute()}
                >
                  CHECK OUT
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
