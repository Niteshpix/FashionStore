import React, { useState } from "react";
import styles from "../account/account.module.css";
import { createCustomer } from "../../../utils/shopify";
import { useRouter } from "next/router";

function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCreateCustomer = async () => {
    try {
      const response = await createCustomer(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      if (response.customer) {
        console.log("Customer created with ID:", response.customer.id);
        router.push("/account/login");
      } else {
        console.error(
          "Error creating customer:",
          response.customerUserErrors[0].message
        );
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create account</h1>
      <p className={styles.paragraph}>
        Register to view your order history, update your details and access your
        wishlist.
      </p>

      <form className={styles.form}>
        <label className={styles.label}>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
          />
        </label>{" "}
        <label className={styles.label}>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button
          type="button"
          onClick={handleCreateCustomer}
          className={styles.button}
        >
          CREATE
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
