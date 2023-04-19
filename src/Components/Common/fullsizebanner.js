import React from "react";
import styles from "../../styles/Home.module.css";

const FullSizeBanner = () => {
  return (
    <div>
      <div className={styles.fullsizebanner}>
        <div className={styles.bannertext1}>
          <h2>Heading Text</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className={styles.bannerbutton1}>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default FullSizeBanner;
