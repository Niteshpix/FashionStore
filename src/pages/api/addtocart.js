export default async function handler(req, res) {
  if (req.method === "POST") {
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
        Authorization: `Basic ${Buffer.from(
          `${process.env.SHOPIFY_STORE_API_KEY}:${process.env.SHOPIFY_STORE_API_PASS_TOKEN}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        variants,
      }),
    });

    if (result.ok) {
      res.status(200).json({ success: true, url });
    } else {
      res.status(result.status).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
