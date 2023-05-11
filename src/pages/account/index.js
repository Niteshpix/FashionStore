import React, { useEffect, useState } from "react";
import { getCustomerOrders } from "../../../utils/shopify";
import SideNav from "@/Components/Common/sidenav";

function UserAccount() {
  const [orders, setOrders] = useState([]);
  const [userDetails, setCustomerDetails] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerToken = sessionStorage.getItem("token");
        const response = await getCustomerOrders(customerToken);
        setCustomerDetails(response.customer);
        let data = response.customer.orders.nodes;
        setOrders(data);
      } catch (error) {
        console.error("Error retrieving customer orders:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="wraper">
      <h4>My Account</h4>
      <SideNav orders={orders} userDetails={userDetails} setCustomerDetails={setCustomerDetails} />
    </div>
  );
}

export default UserAccount;
