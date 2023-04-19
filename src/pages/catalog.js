import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import axios from "axios";
import { Card, Col } from "react-bootstrap";

function Catalog() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => {
        if (res.data.status === true) {
          setProduct(res.data.data.products);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.product}>
      <h2>Products</h2>
      {product.map((prod) => {
        return (
          <Col sm={6} md={4} lg={3} key={prod.id}>
            <Card
              //onClick={() => handleClick(art?.sys?.id)}
              style={{ cursor: "pointer", width: "350px" }}
            >
              <Card.Img
                variant="top"
                src={prod.image.src}
                style={{ height: "300px", width: "300px" }}
              />
              <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                {prod.variants.map((variant, i) => {
                  return (
                    <h5 key={i}>
                      ${variant.price}
                    </h5>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </div>
  );
}

export default Catalog;
