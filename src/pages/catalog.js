import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/Components/Common/loader";
import { useRouter } from "next/router";
import { getProducts } from "../../utils/shopify";

function Catalog() {
  const [isLoading, setIsLoading] = useState(false);
  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data.products.edges);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          let options = prod?.node.options;
          const sizes = options.find((item) => item.name === "Size");
          const originalImageUrl = prod.node.images.edges[0].node.originalSrc;
          const hoverImageUrl = prod.node.images.edges[1].node.originalSrc;
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
