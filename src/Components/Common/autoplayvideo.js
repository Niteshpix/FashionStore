import React, { useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";
import Banner from "./banner";
import HomePageSlider from "./homepageslider";
import Collections from "./collection";

function Autoplayvideo() {
  const videoRef = useRef(null);
  let video =
    "https://cdn.shopify.com/videos/c/o/v/db93ea43a8724ed6823cb95203cc01f2.mp4";

  useEffect(() => {
    const videoElement = videoRef.current;
    // Start video playback when the component mounts
    videoElement.play();
    // Stop video playback when the component unmounts
    return () => {
      videoElement.pause();
      videoElement.currentTime = 0;
    };
  }, []);
  return (
    <div>
      <div className={styles.banner}>
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          className={styles.bannerVideo}
          controls={false}
        />
        <div className={styles.bannerContent}>
          <h1>Sinuous & Sensual Cut</h1>
          <p>Dresses rooted in modernity and ease</p>
          <button type="submit">SHOP NOW</button>
        </div>
      </div>
      <HomePageSlider />
      <Collections />
      <Banner
        title={"The Signature Chain Pouch"}
        path="https://cdn.shopify.com/s/files/1/0746/4386/5884/files/product-image.webp?v=1681807200&width=750"
        description={"Now in three versatile sizes"}
        buttontext="SHOP THE CHAIN POUCH"
      />
    </div>
  );
}

export default Autoplayvideo;
