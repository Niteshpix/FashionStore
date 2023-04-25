var axios = require("axios");
export default function getProducts(req, res) {
  if (req.method === "GET") {
    var config = {
      method: "get",
      url: `https://${process.env.SHOPIFY_STORE_API_KEY}:${process.env.SHOPIFY_STORE_API_PASS_TOKEN}@${process.env.SHOPIFY_STORE_NAME}/admin/api/2022-10/products.json`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(config)
    axios(config)
      .then(function (response) {
        return res.json({ status: true, data: response.data });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          return res.json({ status: false, data: error.response.data });
        } else {
          return res.json({ status: false, data: error.message });
        }
      });
  } else {
    return res.json({ status: false, data: "Method Type invalid" });
  }
}
