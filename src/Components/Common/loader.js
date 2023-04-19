import React from "react";
import styles from "../../styles/Home.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderwrap}>
      <div className={styles.spinnercontainer}>
        <div className={styles.loadingspinner}></div>
      </div>
    </div>
  );
}
