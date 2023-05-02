import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { getCheckoutUrl, retrieveCart } from "../../utils/shopify";
export default function Cart({ cart, checkoutUrl }) {
  return (
    <div className={styles.container}>
      <ul role="list-item">
        {cart.lines.edges.map((item) => {
          return (
            <li key={item.node.id}>
              <div>
                <img
                  src={item.node.merchandise.product.featuredImage.url}
                  alt={item.node.merchandise.product.featuredImage.altText}
                  width={200}
                  height={240}
                />
              </div>
              <div className={styles.content}>
                <h2>{item.node.merchandise.product.title}</h2>
                <p>
                  {
                    item.node.merchandise.product.priceRange.minVariantPrice
                      .amount
                  }
                </p>
                <p>Quantity: {item.node.quantity}</p>
                <p>size: {item.node.size}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <h2>Total - {cart.estimatedCost.totalAmount.amount}</h2>
      <a href={checkoutUrl}>
        <button>Checkout</button>
      </a>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { cartid } = context.query;
  const cart = await retrieveCart(cartid);
  const data = await getCheckoutUrl(cartid);
  const { checkoutUrl } = data.cart;
  return {
    props: {
      cart,
      checkoutUrl,
    },
  };
};
