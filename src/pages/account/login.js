import React, { useState } from "react";
import Link from "next/link";
import styles from "../account/account.module.css";


function LoginForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login to Your Account</h1>
      <p className={styles.paragraph}>
        Login to view your order history, update your details and access your
        wishlist.
      </p>

      <form className={styles.form}>
        <label className={styles.label}>
          Email Address
          <input type="email" name="email" className={styles.input} />
        </label>
        <label className={styles.label}>
          Password
          <input type="password" name="password" className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>
          LOGIN
        </button>
        <Link className={styles.registerlink} href={"/account/register"}>
          CREATE ACCOUNT
        </Link>
        <a className={styles.forgotbtn} href="/account/forgot">
          Forgot your password?
        </a>
      </form>
    </div>
  );
}

export default LoginForm;
