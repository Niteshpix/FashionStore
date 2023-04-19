import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";

function Header() {
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
          <Nav.Link as={Link} href="/" passHref>
            Contact
          </Nav.Link>
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
