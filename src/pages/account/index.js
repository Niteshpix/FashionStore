import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCustomerOrders } from "../../../utils/shopify";
import { Table } from "react-bootstrap";
import { formatDate } from "../../../utils/helpers";

function UserAccount() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerToken = sessionStorage.getItem("token");
        const response = await getCustomerOrders(customerToken);
        let data = response.customer.orders.nodes;
        setOrders(data);
      } catch (error) {
        console.error("Error retrieving customer orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const orderSummary = (id) => {
    router.push({
      pathname: `/orders/${id}`,
    });
  };

  return (
    <div className="wraper">
      <h3>Your Orders</h3>
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
            <tr key={idx} onClick={() => orderSummary(item.id)}>
              <td>
                <button type="text">{item.name}</button>
              </td>
              <td>{formatDate(item.processedAt)}</td>
              <td>{item.financialStatus}</td>
              <td>{item.fulfillmentStatus}</td>
              <td>
                {item.totalPriceV2.amount} {item.totalPriceV2.currencyCode}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserAccount;
