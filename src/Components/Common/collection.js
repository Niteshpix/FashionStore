import React, { useEffect, useState } from "react";
import { getCollections } from "../../../utils/shopify";
import { useRouter } from "next/router";

function Collections() {
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getCollections();
        setCollections(response.collections.edges);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleRoute = (id) => {
    let extractedId = id.split("/").pop();
    router.push("/collection/" + extractedId);
  };

  return (
    <div className="row g-2">
      {collections.map((collection, index) => (
        <div
          key={index}
          className={`col-${index === 0 ? "8" : "4"} mt-2 position-relative`}
        >
          <img
            src={collection.node.image.originalSrc}
            alt={collection.node.title}
            style={{
              height: index === 0 || index === 1 ? "900px" : "900px",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="image-info"
            onClick={() => handleRoute(collection.node.id)}
          >
            <h4>{collection.node.title}</h4>
            <p>Discover</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collections;
