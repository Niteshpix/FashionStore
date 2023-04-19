import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/Components/Common/loader";

function Catalog() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.product}>
      <h2>Products</h2>
      <Row xs={1} md={2} lg={4} style={{ width: "80%", marginTop: "5px" }}>
        {product.map((prod) => {
          return (
            <Col key={prod.id}>
              <Card
                //onClick={() => handleClick(art?.sys?.id)}
                style={{ cursor: "pointer", width: "310px" }}
                className="h-100"
              >
                <Card.Img
                  variant="top"
                  src={prod.image.src}
                  style={{
                    height: "300px",
                    width: "307px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <Card.Body>
                  <Card.Title>{prod.title}</Card.Title>
                  {prod.variants.map((variant, i) => {
                    return <h5 key={i}>${variant.price}</h5>;
                  })}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Catalog;
