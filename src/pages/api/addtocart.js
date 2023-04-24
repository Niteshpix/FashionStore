import fetch from "node-fetch";

export default async function (req, res) {
  const { variants } = req.body;
  let url = `https://${process.env.SHOPIFY_STORE_NAME}/cart/`;
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    url += `${variant.variantId}:${variant.quantity}`;
    if (i < variants.length - 1) {
      url += ",";
    }
  }
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(
        `${process.env.SHOPIFY_STORE_API_KEY}:${process.env.SHOPIFY_STORE_API_PASS_TOKEN}`
      )}`,
    },
    body: JSON.stringify({
      variants,
    }),
  });

  if (result.status === 200) {
    res.status(200).json({ success: true });
  } else {
    res.status(result.status).json({ success: false });
  }
}
