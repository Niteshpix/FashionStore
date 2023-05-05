import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/Components/Common/loader";
import { useRouter } from "next/router";
import { getProducts } from "../../utils/shopify";

function Catalog({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hovering, setHovering] = useState(false);
  const router = useRouter();
  const products = data.products.edges;

  const handleRoutes = (product) => {
    router.push(`product/${product.node.handle}/?productid=${product.node.id}`);
  };

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
        {products.map((prod) => {
          console.log(prod)
          let options = prod?.node.options;
          const sizes = options.find((item) => item.name === "Size");
          const originalImageUrl = prod.node.featuredImage.originalSrc;
          const hoverImageUrl =
            "https://cdn.shopify.com/s/files/1/0746/3229/8790/products/jw5.webp?v=1682923509";
          return (
            <div
              key={prod.node.id}
              onMouseOver={() => setHovering(true)}
              onMouseOut={() => setHovering(false)}
            >
              <Col>
                <div
                  className="img"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRoutes(prod)}
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
                  {sizes &&
                    sizes.values.map((size, index) => (
                      <div key={index} className={styles.box}>
                        {size}
                      </div>
                    ))}
                </div>
              ) : (
                <div className={styles.cardinfo}>
                  <span>{prod.node.title} </span>
                  {prod.node.variants.edges.slice(0, 1).map((variant, i) => {
                    return <p key={i}>₹{variant.node.price.amount}</p>;
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

export const getServerSideProps = async () => {
  const data = await getProducts();
  return {
    props: { data },
  };
};
