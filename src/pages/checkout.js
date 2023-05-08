import { CartContext } from "@/Components/AppContext";
import LoadingSpinner from "@/Components/Common/loader";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import formatPrice from "../../utils/helpers";

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  let url = cartItems[0]?.url;
  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => {
      const price = item.product.variants[0].price;
      return acc + price * item.quantity;
    }, 0);
    setSubTotalPrice(totalPrice);
  }, [cartItems]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="wraper">
      checkout page
      <hr />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Summary</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="row">
                      <div className="col-3">
                        <img
                          src={item.product.image.src}
                          alt="image"
                          style={{ height: "150px", width: "100px" }}
                        />
                      </div>
                      <div className="col-6">
                        <p>{item.product.title}</p>
                        <p>Size: {item.selectedsize}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>

                  {item.product.variants.slice(0, 1).map((variant, i) => {
                    return (
                      <React.Fragment key={i}>
                        <td>{formatPrice(variant.price)}</td>
                        <td>{formatPrice(variant.price * item.quantity)}</td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}

              <tr>
                <td colSpan="3">Items Total:</td>
                <td>{formatPrice(subTotalPrice)}</td>
              </tr>
            </tbody>
          </Table>
          <iframe
            src={url}
            title="fashionstroe"
            width="100%"
            height="500px"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Checkout;
