import React from "react";
import styles from "../styles/product.module.css";
import Catalog from "@/Components/Common/catalog";

function catalog() {
  return (
    <div className={styles.product}>
      <h2>Products</h2>
      <Catalog />
    </div>
  );
}

export default catalog;
