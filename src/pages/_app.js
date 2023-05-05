import { CartProvider } from "@/Components/AppContext";
import Layout from "@/Components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token || router.pathname === "/account/login") {
      router.push("/");
    } else {
      router.push("/account/login");
    }
  }, []);
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
