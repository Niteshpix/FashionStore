import React, { useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";

function Autoplayvideo() {
  const videoRef = useRef(null);
  let video = "";

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
          controls
        />
      </div>
    </div>
  );
}

export default Autoplayvideo;
