import axios from "axios";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id, quantity } = req.body;
    const formData = {
      items: [
        {
          id,
          quantity,
          properties: null,
          quantity: 1,
          variant_id: 44879913025830,
          key: "44879913025830:d364b1e419c27e7117fb9c594a55b3e7",
          title:
            "Chain Pouch with Strap In White Leather - Black / 18 / Rubber",
          price: 11670000,
          original_price: 11670000,
          discounted_price: 11670000,
          line_price: 11670000,
          original_line_price: 11670000,
          total_discount: 0,
          discounts: [],
          sku: "",
          grams: 900,
          vendor: "FashionStroe",
          taxable: true,
          product_id: 8251519533350,
          product_has_only_default_variant: false,
          gift_card: false,
          final_price: 11670000,
          final_line_price: 11670000,
        },
      ],
    };
    console.log(formData);
    const response = fetch(`https://fashionstroe.myshopify.com/cart/add.js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response, "_________");

    res.status(200).json({ status: "success" });
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}
