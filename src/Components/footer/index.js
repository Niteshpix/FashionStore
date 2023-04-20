import React from "react";
import styles from "./footer.module.css";
function Footer() {
  return (
    <div className={styles.footewrap}>
      <footer className={styles.footercontainer}>
        <div className={styles.footercontent}>
          <div className={styles.footerinput}>
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@domain.com"
            />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </footer>
      <div className={styles.leftcontent}>
        <p>&copy; 2023, jolenefashion Powered by Shopify</p>
      </div>
    </div>
  );
}

export default Footer;
