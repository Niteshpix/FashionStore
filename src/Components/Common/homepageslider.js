import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
const images = [
  "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1628313388780-fb046760ef1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  "https://images.unsplash.com/photo-1683088021841-465c694ad199?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
];
function HomePageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };
  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider-content"]}>
        <h1>This is jolen</h1>
        <p>By Ruchi</p>
        <button>DISCOVER</button>
      </div>
      <div className={`${styles["slider-button"]} ${styles.prev}`}>
        <TfiArrowCircleLeft onClick={handlePrev} />
      </div>
      <img
        src={images[currentImage]}
        alt="Slider"
        className={styles["slider-image"]}
      />
      <div className={`${styles["slider-button"]} ${styles.next}`}>
        <TfiArrowCircleRight onClick={handleNext} />
      </div>
    </div>
  );
}

export default HomePageSlider;
