import React from "react";
import styles from "../../styles/Home.module.css";

const Banner = (props) => {
  const { title, image, description, buttontext } = props;

  return (
    <div>
      <div className={styles.banner1}>
        <img
          src={props.path}
          alt="banner image"
          className={styles.bannerimage}
        />
        {image}
        <div className={styles.bannertext}>
          <div className={styles.bannertextinner}>
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={styles.bannerbutton}>{buttontext}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
