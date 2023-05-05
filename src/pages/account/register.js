import React, { useState } from "react";
import styles from "../account/account.module.css";
import { createCustomer } from "../../../utils/shopify";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: undefined,
    }));
  };

  const handleCreateCustomer = async () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your last name";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password.trim()) {
      errors.password = "Please enter a password";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await createCustomer(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password
        );

        if (response.customer) {
          toast.success("Registration successful!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            router.push("/account/login");
          }, 2000);
        } else {
          toast.warning(response.customerUserErrors[0].message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        let errmessage = error?.response?.errors[0]?.message;
        toast.warning(errmessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setFormSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
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
          {formErrors.firstName && formSubmitted && (
            <span className={styles.error}>{formErrors.firstName}</span>
          )}
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
          {formErrors.lastName && formSubmitted && (
            <span className={styles.error}>{formErrors.lastName}</span>
          )}
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
          {formErrors.email && formSubmitted && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
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
          {formErrors.password && formSubmitted && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
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
