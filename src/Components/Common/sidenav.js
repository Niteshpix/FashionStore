import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/router";
import MyOrderComponent from "../Accounts/order";
import Wishlist from "../Accounts/wishlist";
import AddressBook from "../Accounts/addressbook";

const SideNav = (props) => {
  let { orders, userDetails } = props;
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("My Order");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/account/login");
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    if (selectedItem === "My Order") {
      return <MyOrderComponent orders={orders} userDetails={userDetails} />;
    } else if (selectedItem === "My Wishlist") {
      return <Wishlist />;
    } else if (selectedItem === "My Address Book") {
      return <AddressBook userDetails={userDetails} />;
    } else {
      return null; // Render nothing if no menu item is selected
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidenav}>
        <ul className={styles.menu}>
          <li
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("My Order")}
          >
            My Order
          </li>
          <li
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("My Wishlist")}
          >
            My Wishlist
          </li>
          <li
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("My Address Book")}
          >
            My Address Book
          </li>
          <li className={styles.menuItem} onClick={() => handleLogout()}>
            Logout <HiOutlineLogout />
          </li>
        </ul>
      </div>

      <div className={styles.selectedComponent}>{renderComponent()}</div>
    </div>
  );
};

export default SideNav;
