var axios = require("axios");
export default function getProducts(req, res) {
  if (req.method === "GET") {
    var config = {
      method: "get",
      url: `https://${process.env.SHOPIFY_STORE_API_KEY}:${process.env.SHOPIFY_STORE_API_PASS_TOKEN}@${process.env.SHOPIFY_STORE_NAME}/admin/api/2022-10/shop.json`,
      headers: {
        "Content-Type": "application/json",
      },
    };
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
// const [shopData, setShopData] = useState(null);

//   useEffect(() => {
//     async function fetchShopData() {
//       const response = await fetch("/api/shopify");
//       const data = await response.json();
//       setShopData(data);
//     }

//     fetchShopData();
//   }, []);

//   console.log(shopData);
