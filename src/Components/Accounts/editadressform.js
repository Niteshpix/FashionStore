import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../pages/account/account.module.css";
import { createAddress } from "../../../utils/shopify";

function AddressForm({
  address,
  setEditingAddressId,
  setAddress,
  title,
  buttontext,
  buttontext2,
  userDetails,
}) {
  const [editedAddress, setEditedAddress] = useState(address);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleClick = async (buttontext) => {
    if (buttontext === "Update") {
      setEditingAddressId(null);
    } else if (buttontext === "Submit") {
      let address = editedAddress;
      let customerAccessToken = sessionStorage.getItem("token");
      try {
        const response = await createAddress(customerAccessToken, address);
        if (response.customerAddress.id !== null) {
          setAddress(false);
        }
      } catch (error) {
        console.error("Error adding address:");
      }
    }
  };

  const handleClose = (buttontext2) => {
    if (buttontext2 === "Close") {
      setEditingAddressId(null);
    } else if (buttontext2 === "Cancel") {
      setAddress(false);
    }
  };

  return (
    <div className={styles.addressForm}>
      <Card.Title className={styles.addressName}>{title}</Card.Title>
      <div className={styles.formGroup}>
        <div className={styles.parallelFields}>
          <div className={styles.inputFieldWrapper}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={editedAddress && editedAddress.firstName}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputFieldWrapper}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editedAddress?.lastName}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.inputFieldWrapper}>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={editedAddress?.company}
            onChange={handleFormChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.parallelFields}>
          <div className={styles.inputFieldWrapper}>
            <label>Address 1</label>
            <input
              type="text"
              name="address1"
              value={editedAddress?.address1}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputFieldWrapper}>
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              value={editedAddress?.address2}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.parallelFields}>
          <div className={styles.inputFieldWrapper}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={editedAddress?.city}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputFieldWrapper}>
            <label>State</label>
            <input
              type="text"
              name="province"
              value={editedAddress?.province}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputFieldWrapper}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={editedAddress?.country}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.parallelFields}>
          <div className={styles.inputFieldWrapper}>
            <label>Zipcode</label>
            <input
              type="text"
              name="zip"
              value={editedAddress?.zip}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputFieldWrapper}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={editedAddress?.phone}
              onChange={handleFormChange}
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.inputFieldWrapper}>
          <label>
            <input
              type="checkbox"
              name="isChecked"
              //checked={editedAddress.isChecked}
              onChange={handleFormChange}
            />{" "}
            Set as default address
          </label>
        </div>
      </div>

      {/* Add other form fields here */}
      <div className={styles.buttonsContainer}>
        <button
          type="text"
          onClick={() => handleClick(buttontext)}
          className={styles.editButton}
        >
          {buttontext}
        </button>
        <button
          type="text"
          onClick={() => handleClose(buttontext2)}
          className={styles.removeButton}
        >
          {buttontext2}
        </button>
      </div>
    </div>
  );
}

export default AddressForm;
