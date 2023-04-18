import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";

function Header() {
  return (
    <div>
      <p className={styles.announcementbar}>
        <span>Welcome to our store</span>
      </p>
      <Navbar className={styles.navbar}>
        <Navbar.Brand href="/">
          <h2>FashionStore</h2>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" active>
            Home
          </Nav.Link>
          <Nav.Link href="/catalog">Catalog</Nav.Link>
          <Nav.Link href="#pricing">Contact</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <BsSearch className={styles.searchIcon} />
          <HiOutlineShoppingBag
            className={`${styles.searchIcon} ${styles.searchIconWithMargin}`}
          />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
