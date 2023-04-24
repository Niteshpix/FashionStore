import { CartContext } from "@/Components/AppContext";
import Slider from "@/Components/Common/slider";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Singleproduct() {
  const router = useRouter();
  let { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  let images = singleProduct?.images;
  let options = singleProduct?.options;
  const sizes = options?.find((item) => item?.name === "Size");
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useContext(CartContext);

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

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToBag = async () => {
    if (selectedSize) {
      const newItem = {
        product: singleProduct,
        selectedsize: selectedSize,
      };
      addItem(newItem);
      const variants = [
        { variantId: 44879913025830, quantity: 2 },
        { variantId: 44885640806694, quantity: 3 },
      ];
      const result = await fetch("/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variants,
        }),
      });

      const data = await result.json();
      console.log(result);

      if (data.success) {
        console.log("Item added to cart successfully");
      } else {
        console.error("Failed to add item to cart");
      }
    }
  };

  return (
    <div className="wraper">
      <ToastContainer />
      <div className="row">
        <div className="col-sm-7">
          <div className="row">
            <Slider images={images} />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="text-container">
            <h3>{singleProduct?.title}</h3>
            {singleProduct?.variants.slice(0, 1).map((variant, i) => {
              return <p key={i}>₹{variant?.price}</p>;
            })}
            <div className="seprator" />
            <div className="row mt-4">
              <div className="col">
                <h6>Uk size</h6>
                <div className={"sizeinfo"}>
                  {sizes &&
                    sizes.values.map((size, index) => (
                      <label
                        key={index}
                        className={`box ${
                          selectedSize === size ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={handleSizeChange}
                        />
                        {size}
                      </label>
                    ))}
                  <p>Limited Availability</p>
                </div>
              </div>
              <div className="col" style={{ textAlign: "end" }}>
                <h6>Size & Fit Guide</h6>
              </div>
              <button
                className={"bannerbutton1"}
                style={{ marginTop: "30px" }}
                disabled={!selectedSize}
                onClick={handleAddToBag}
              >
                {selectedSize ? "ADD TO BAG" : "SELECT SIZE"}
              </button>

              <div
                dangerouslySetInnerHTML={{ __html: singleProduct?.body_html }}
              />
              <div
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                  textAlign: "left",
                  fontStyle: "italic",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Delivery & Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
