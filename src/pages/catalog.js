import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/Components/Common/loader";
import { useRouter } from "next/router";

function Catalog() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hovering, setHovering] = useState(true);
  const router = useRouter();

  const handleRoutes = (id) => {
    router.push("/product/" + id);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/product")
      .then((res) => {
        if (res.data.status === true) {
          setProduct(res.data.data.products);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sizes = ["34", "36", "38", "40", "42"];

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.product}>
      <h2>Products</h2>
      <Row
        xs={1}
        md={4}
        lg={4}
        style={{ width: "100%", marginTop: "5px" }}
        gutter={10}
      >
        {product.map((prod) => {
          const originalImageUrl = prod.image.src;
          const hoverImageUrl =
            "https://cdn.shopify.com/s/files/1/0746/3229/8790/products/jw3.webp?v=1681968349";
          return (
            <div
              key={prod.id}
              onMouseOver={() => setHovering(true)}
              onMouseOut={() => setHovering(false)}
            >
              <Col>
                <div
                  className="img"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRoutes(prod.id)}
                >
                  <img
                    src={hovering ? hoverImageUrl : originalImageUrl}
                    alt=""
                    style={{ height: "640px", width: "450px" }}
                  />
                </div>
              </Col>
              {hovering ? (
                <div className={styles.sizeinfo}>
                  {sizes.map((size, index) => (
                    <div key={index} className={styles.box}>
                      {size}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.cardinfo}>
                  <span>{prod.title} </span>
                  {prod.variants.slice(0, 1).map((variant, i) => {
                    return <p key={i}>₹{variant.price}</p>;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Row>
    </div>
  );
}

export default Catalog;
