import { CartContext } from "@/Components/AppContext";
import LoadingSpinner from "@/Components/Common/loader";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import formatPrice from "../../utils/helpers";

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, checkoutUrl } = useContext(CartContext);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  let checkout_Url = checkoutUrl?.cart?.checkoutUrl;
  let lines = cartItems?.lines?.edges;

  useEffect(() => {
    const totalPrice = lines?.reduce((total, line) => {
      const price = parseFloat(line.node.merchandise.price.amount);
      return total + price * line.node.quantity;
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
              {lines &&
                lines.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={item.node.merchandise.image.originalSrc}
                            alt="image"
                            style={{ height: "150px", width: "100px" }}
                          />
                        </div>
                        <div className="col-6">
                          <p>{item.node.merchandise.product.handle}</p>
                          <p>Size: {item.node.merchandise.title}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.node.quantity}</td>

                    <React.Fragment key={i}>
                      <td>{formatPrice(item.node.merchandise.price.amount)}</td>
                      <td>
                        {formatPrice(
                          item.node.merchandise.price.amount *
                            item.node.quantity
                        )}
                      </td>
                    </React.Fragment>
                  </tr>
                ))}

              <tr>
                <td colSpan="3">Items Total:</td>
                <td>{formatPrice(subTotalPrice)}</td>
              </tr>
            </tbody>
          </Table>
          <iframe
            src={checkout_Url}
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
