// import axios from "axios";

// export default async function addToCart(req, res) {
//   if (req.method === "POST") {
//     try {
//       var variantId = "44879913025830";
//       var quantity = 2;

//       var config = {
//         method: "post",
//         url: `https://${process.env.SHOPIFY_STORE_NAME}/cart/add.js?id=${variantId}&quantity=${quantity}`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       axios(config)
//         .then(function (response) {
//           return res.json({ status: true, data: response.data });
//         })
//         .catch(function (error) {
//           if (error.response) {
//             console.log(error.response.data);
//             return res.json({ status: false, data: error.response.data });
//           } else {
//             return res.json({ status: false, data: error.message });
//           }
//         });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         error: "Internal server error",
//       });
//     }
//   }
// }

import axios from "axios";

export default async function handler(req, res) {
  //const { items } = req.body;

  let items = [{ id: "8251519533350", quantity: 1 }];

  try {
    const response = await axios.post(
      "https://fashionstroe.myshopify.com/cart.json",
      {
        item: JSON.stringify(items),
      },
      {
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
