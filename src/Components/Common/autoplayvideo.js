import React, { useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";

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
      </div>
    </div>
  );
}

export default Autoplayvideo;
