import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Singleproduct() {
  const router = useRouter();
  let { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState();

  useEffect(() => {
    setIsLoading(true);
    if (router.asPath !== router.route) {
      fetchSingleProduct();
    }
  }, [router]);

  async function fetchSingleProduct() {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/product/${id}`);
      if (response.data.status === true) {
        setSingleProduct(response.data.data.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  //console.log(singleProduct);

  const images = [
    {
      src: "https://cdn.shopify.com/s/files/1/0107/7110/3802/products/VictoriaBeckham_RuchedBackMidiDressInLargeShellsPrint_LARGESHELLSPRINT_1223WDR004762A_2700_4050_247_WHITE_LR_HR_Front_Model1_JPG_1100x.jpg?v=1675687366",
      alt: "image1",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0107/7110/3802/products/VictoriaBeckham_RuchedBackMidiDressInLargeShellsPrint_LARGESHELLSPRINT_1223WDR004762A_2700_4050_247_WHITE_LR_HR_Front_Model1_JPG_1100x.jpg?v=1675687366",
      alt: "image2",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0107/7110/3802/products/VictoriaBeckham_RuchedBackMidiDressInLargeShellsPrint_LARGESHELLSPRINT_1223WDR004762A_2700_4050_247_WHITE_LR_HR_Front_Model1_JPG_1100x.jpg?v=1675687366",
      alt: "image3",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0107/7110/3802/products/VictoriaBeckham_RuchedBackMidiDressInLargeShellsPrint_LARGESHELLSPRINT_1223WDR004762A_2700_4050_247_WHITE_LR_HR_Front_Model1_JPG_1100x.jpg?v=1675687366",
      alt: "image4",
    },
  ];

  return (
    <div className="wraper">
      <div className="row">
        <div className="col-9">
          <div className="row">
            {images.map((image, index) => {
              if (index < 2) {
                return (
                  <img
                    key={index}
                    style={{ height: "750px", width: "600px" }}
                    src={image.src}
                    alt={image.alt}
                  />
                );
              } else {
                return (
                  <div key={index} className="row">
                    <img
                      style={{
                        height: "750px",
                        width: "600px",
                        marginTop: "18px",
                      }}
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-3">
          <p>Some text goes here</p>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
