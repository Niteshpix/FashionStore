export default function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return formattedPrice;
}
export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
}
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTimestamp = date.toLocaleString("en-US", options);
  return `Placed on ${formattedTimestamp}`;
}
