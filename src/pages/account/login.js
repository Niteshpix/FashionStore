import React, { useState } from "react";
import Link from "next/link";
import styles from "../account/account.module.css";
import { login } from "../../../utils/shopify";
import { ToastContainer, toast } from "react-toastify";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email and password are valid
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit the form if email and password are valid
    login(formData.email, formData.password).then((res) => {
      if (res.customerAccessToken !== null) {
        let token = res.customerAccessToken.accessToken;
        sessionStorage.setItem("token", token);
        toast.success("login Success !!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        let errormessage = res.customerUserErrors[0].message;
        toast.warning(errormessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  // State variable to store form errors
  const [formErrors, setFormErrors] = useState({});

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.heading}>Login to Your Account</h1>
      <p className={styles.paragraph}>
        Login to view your order history, update your details and access your
        wishlist.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email Address
          <input
            type="email"
            name="email"
            className={styles.input}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            className={styles.input}
            onChange={handleChange}
          />
          {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
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
