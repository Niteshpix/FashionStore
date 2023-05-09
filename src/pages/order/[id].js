import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOrderById } from "../../../utils/shopify";
import { Table } from "react-bootstrap";
import formatPrice, { formatTimestamp } from "../../../utils/helpers";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
function OrderSummary() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  // Calculate subtotal
  const subtotal = order?.lineItems.edges
    .reduce((acc, { node }) => {
      return acc + parseFloat(node.originalTotalPrice.amount);
    }, 0)
    .toFixed(2);

  const taxRate = 0.18; // 18.0%
  const tax = (subtotal * taxRate).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.node);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);
  const backArrowClick = () => {
    router.push("/account");
  };
  const handleRoutes = (product) => {
    router.push(`/product/${product.handle}/?productid=${product.id}`);
  };

  return (
    <div className="wraper">
      <div>
        {order ? (
          <div>
            <div className={"d-flex align-center"}>
              <button className={"back_btn"} onClick={backArrowClick}>
                <MdOutlineArrowBackIosNew />
              </button>
              <h4>Order #{order.orderNumber}</h4>
            </div>
            <p>{formatTimestamp(order.processedAt)}</p>

            <Table striped bordered>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>SKU</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {order.lineItems.edges.map((item, idx) => (
                  <tr key={idx}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRoutes(item.node.variant.product)}
                    >
                      {item.node.title}
                    </td>
                    <td>{item.node.variant.sku}</td>
                    <td>{formatPrice(item.node.variant.price.amount)}</td>
                    <td>{item.node.quantity}</td>
                    <td>{formatPrice(item.node.originalTotalPrice.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">
                    <h6>Subtotal </h6>
                    <h6>Shipping (Standard) </h6>
                    <h6>Tax (IGST 18.0%) </h6>
                    <h5>Total</h5>
                  </td>

                  <td colSpan="4">
                    <p>{formatPrice(subtotal)}</p>
                    <p>{formatPrice("000")}</p>
                    <p>{formatPrice(tax)}</p>
                    <h5>{formatPrice(total)}</h5>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        ) : (
          "You haven't placed any orders yet. "
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
