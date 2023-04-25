const shopifyDomain = `${process.env.SHOPIFY_STORE_NAME}`;
const accessToken = `${process.env.SHOPIFY_STORE_API_PASS_TOKEN}`;

export default async (req, res) => {
  try {
    const response = await fetch(`https://${shopifyDomain}/cart.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({
        checkout: {},
      }),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch checkout URL." });
  }
};
