import { CartProvider } from "@/Components/AppContext";
import Layout from "@/Components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
