import { CartContext } from "@/Components/AppContext";
import Slider from "@/Components/Common/slider";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addToCart, getProduct, updateCart } from "../../../utils/shopify";
import { useRouter } from "next/router";
import LoadingSpinner from "@/Components/Common/loader";

function Singleproduct() {
  let [product, SetProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let images = product?.images.edges;
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useContext(CartContext);
  const router = useRouter();
  const { productid } = router.query;

  useEffect(() => {
    setIsLoading(true);
    const fetchOrder = async () => {
      try {
        const response = await getProduct(productid);
        product = response;
        SetProduct(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    if (router.asPath !== router.pathname) {
      fetchOrder();
    }
  }, [productid]);

  const handleSizeChange = (item) => {
    setSelectedSize((prevSelectedSize) => {
      if (prevSelectedSize.size === item) {
        return {
          ...prevSelectedSize,
          quantity: prevSelectedSize.quantity + 1,
        };
      } else {
        return {
          size: item,
          quantity: 1,
        };
      }
    });
  };

  //console.log(selectedSize.size.quantityAvailable);
  const handleAddToBag = async () => {
    setSelectedSize("");
    let cartId = sessionStorage.getItem("cartId");
    if (cartId) {
      await updateCart(cartId, selectedSize?.size.id, selectedSize.quantity);
    } else {
      let data = await addToCart(selectedSize?.size.id, selectedSize.quantity);
      cartId = data.cartCreate.cart.id;
      sessionStorage.setItem("cartId", cartId);
    }
    addItem();
    toast.success("Item Added !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="wraper">
      <ToastContainer />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <div className="col-sm-7">
            <div className="row">
              <Slider images={images} />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="text-container">
              <h3>{product && product.title}</h3>
              {product &&
                product.variants.edges.slice(0, 1).map((variant, i) => {
                  return <p key={i}>₹{variant.node.price.amount}</p>;
                })}
              <div className="seprator" />
              <div className="row mt-4">
                <div className="col">
                  <h6>Uk size</h6>
                  <div className="sizeinfo">
                    {product &&
                      product?.variants.edges.map((variant, index) => {
                        const isSoldOut = variant.node.quantityAvailable === 0;

                        return (
                          <label
                            key={index}
                            className={`box ${
                              selectedSize &&
                              selectedSize.size.id === variant.node.id
                                ? "selected"
                                : isSoldOut
                                ? "soldout"
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="size"
                              value={variant.node.title}
                              checked={selectedSize.size === variant.node.title}
                              onChange={() => handleSizeChange(variant.node)}
                            />
                            {variant.node.title}
                          </label>
                        );
                      })}
                  </div>
                </div>
                <div className="col" style={{ textAlign: "end" }}>
                  <h6>Size & Fit Guide</h6>
                </div>
                <button
                  className={"bannerbutton1"}
                  style={{ marginTop: "30px" }}
                  disabled={
                    !selectedSize || selectedSize?.size?.quantityAvailable === 0
                  }
                  onClick={handleAddToBag}
                >
                  {!selectedSize ? "SELECT SIZE" : ""}
                  {selectedSize?.size?.quantityAvailable !== 0 && selectedSize
                    ? "ADD TO BAG"
                    : ""}
                  {selectedSize?.size?.quantityAvailable === 0
                    ? "SOLD OUT"
                    : ""}
                </button>

                <div
                  dangerouslySetInnerHTML={{ __html: product?.description }}
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
      )}
    </div>
  );
}

export default Singleproduct;
