export default async function getNavigationLinks(req, res) {
  const response = await fetch(
    "https://fashionstroe.myshopify.com/admin/api/2023-04/linklists.json",
    {
      headers: {
        "X-Shopify-Access-Token": "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",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const linklists = data.linklists;

    res.status(200).json(linklists);
  } else {
    res.status(response.status).json({
      error: `Failed to fetch navigation links: ${response.status} ${response.statusText}`,
    });
  }
}
