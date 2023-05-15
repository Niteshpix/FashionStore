import React, { useEffect, useState } from "react";
import { getCollectionsById } from "../../../utils/shopify";
import { useRouter } from "next/router";

function Collections() {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collections, setCollections] = useState([]);

//   console.log(collections);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await getCollectionsById(collectionId);
//         setCollections(response.similarCollections.edges);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   }, [collectionId]);

  return <div className="wraper">Collections</div>;
}

export default Collections;
