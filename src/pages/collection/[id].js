import React, { useEffect, useState } from "react";
import { getCollectionById } from "../../../utils/shopify";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/Components/Common/loader";
import styles from "../../styles/product.module.css";

function Collections() {
  const router = useRouter();
  const { id } = router.query;
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveringId, setHoveringId] = useState(null);
  let totalcollection = collections?.products?.edges?.length;

  const handleHover = (productId) => {
    setHoveringId(productId);
  };
  const handleRoutes = (product) => {
    router.push(
      `/product/${product.node.handle}/?productid=${product.node.id}`
    );
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getCollectionById(id);
        setCollections(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    if (router.asPath !== router.pathname) {
      fetchData();
    }
  }, [id]);
  const collactiontitle =
    collections?.title?.charAt(0).toUpperCase() + collections?.title?.slice(1);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.product}>
      <h2>{collactiontitle.toString()}</h2>
      <p>{collections.description}</p>

      <div className={`row ${styles.container}`}>
        <div className={`col-6 ${styles.column1}`}>
          <label htmlFor="availability" className={styles.label}>
            Filter
          </label>
          <select id="availability" className={styles.select}>
            <option value="all">Availability</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>

          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <select id="price" className={styles.select}>
            <option value="all">All</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className={`col-6  ${styles.column}`}>
          <label htmlFor="sort" className={styles.label}>
            Sort by:
          </label>
          <select id="sort" className={styles.select}>
            <option value="bestSelling">Best Selling</option>
            <option value="newest">Newest</option>
            <option value="topRated">Top Rated</option>
          </select>
          <label htmlFor="price" className={styles.label}>
            {totalcollection} Product
          </label>
        </div>
      </div>

      <Row
        xs={1}
        md={4}
        lg={4}
        style={{ width: "100%", marginTop: "5px" }}
        gutter={10}
      >
        {collections?.products?.edges?.map((prod) => {
          let options = prod?.node.options;
          const sizes = options.find((item) => item.name === "Size");
          const originalImageUrl = prod.node.images.edges[0].node.originalSrc;
          const hoverImageUrl = prod.node.images.edges[1].node.originalSrc;
          const isHovering = hoveringId === prod.node.id;

          return (
            <div
              key={prod.node.id}
              onMouseEnter={() => handleHover(prod.node.id)}
              onMouseLeave={() => handleHover(null)}
            >
              <Col>
                <div
                  className="img"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRoutes(prod)}
                >
                  <img
                    src={isHovering ? hoverImageUrl : originalImageUrl}
                    alt=""
                    style={{ height: "640px", width: "450px" }}
                  />
                </div>
                {isHovering ? (
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
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
}

export default Collections;
