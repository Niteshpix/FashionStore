import React from "react";
import { Table } from "react-bootstrap";
import formatPrice, { formatDate } from "../../../utils/helpers";
import { useRouter } from "next/router";

function MyOrderComponent(props) {
  let { orders, userDetails } = props;
  const router = useRouter();
  const orderSummary = (id) => {
    const orderId = id.split("/").pop();
    router.push({
      pathname: `/order/${orderId}`,
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-9">
          {orders ? (
            <div>
              <h4>Order History</h4>
              <p>
                To track, exchange or return your order, click on the order
                number.
              </p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>ORDER</th>
                    <th>DATE</th>
                    <th>PAYMENT STATUS</th>
                    <th>FULFILLMENT STATUS</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <button
                          onClick={() => orderSummary(item.id)}
                          type="text"
                        >
                          {item.name}
                        </button>
                      </td>
                      <td>{formatDate(item.processedAt)}</td>
                      <td>{item.financialStatus}</td>
                      <td>{item.fulfillmentStatus}</td>
                      <td>
                        {formatPrice(item.totalPriceV2.amount)}{" "}
                        {item.totalPriceV2.currencyCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            "You haven't placed any orders yet. "
          )}
        </div>
        <div className="col-3">
          <h4>Account details</h4>
          <h5>
            {userDetails?.firstName} {userDetails?.lastName}
          </h5>
          <h6>{userDetails?.email}</h6>
          <div>
            <span>
              {userDetails?.defaultAddress.city}
              {", "}
              {userDetails?.defaultAddress.province}
              {", "}
              {userDetails?.defaultAddress.zip}
              {", "}
              {userDetails?.defaultAddress.country}
            </span>
          </div>
          <button style={{marginTop:"12px", border:"none"}} type="text">View details</button>
        </div>
      </div>
    </div>
  );
}

export default MyOrderComponent;
