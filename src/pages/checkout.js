import LoadingSpinner from "@/Components/Common/loader";
import React, { useEffect, useState } from "react";

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="wraper">
      checkout page
      <hr />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <iframe
          src="https://www.example.com"
          title="Example Website"
          width="100%"
          height="500px"
        ></iframe>
      )}
    </div>
  );
}

export default Checkout;
