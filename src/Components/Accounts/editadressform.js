import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../pages/account/account.module.css";
import { createAddress, updateAddress } from "../../../utils/shopify";
import { ToastContainer, toast } from "react-toastify";

function AddressForm({
  address,
  setEditingAddressId,
  setAddress,
  title,
  buttontext,
  buttontext2,
  userDetails,
  setCustomerDetails,
}) {
  const [editedAddress, setEditedAddress] = useState(address);
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editedAddress?.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!editedAddress?.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!editedAddress?.company) {
      errors.company = "company Name is required";
    }
    if (!editedAddress?.address1) {
      errors.address1 = "Address 1 is required";
    }
    if (!editedAddress?.address2) {
      errors.address2 = "Address 2 is required";
    }
    if (!editedAddress?.city) {
      errors.city = "City is required";
    }
    if (!editedAddress?.province) {
      errors.province = "State is required";
    }
    if (!editedAddress?.country) {
      errors.country = "Country is required";
    }
    if (!editedAddress?.zip) {
      errors.zip = "Zipcode is required";
    }
    if (!editedAddress?.phone) {
      errors.phone = "Phone Number is required";
    }
    // Add more validation rules for each field

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClick = async (buttontext, ids) => {
    const isValid = validateForm();

    if (isValid) {
      if (buttontext === "Update") {
        // Update logic
        const customerAccessToken = sessionStorage.getItem("token");
        const addressId = ids;
        const updatedAddress = {
          firstName: editedAddress.firstName,
          lastName: editedAddress.lastName,
          address1: editedAddress.address1,
          address2: editedAddress.address2,
          city: editedAddress.city,
          province: editedAddress.province,
          country: editedAddress.country,
          company: editedAddress.company,
          phone: editedAddress.phone,
          zip: editedAddress.zip,
        };

        updateAddress(customerAccessToken, addressId, updatedAddress)
          .then((result) => {
            if (result.customerAddress && result.customerAddress.id) {
              toast.success("Address Updated successfully !!", {
                position: toast.POSITION.TOP_CENTER,
              });

              userDetails.addresses.edges[0].node = {
                ...userDetails.addresses.edges[0].node,
                ...updatedAddress,
              };

              setTimeout(() => {
                setEditingAddressId(null);
              }, 1500);
            }
          })
          .catch((error) => {
            // Handle any errors that occurred during the update operation
            console.error("Error updating address:", error);
          });
      } else if (buttontext === "Submit") {
        // Submit logic
        let address = editedAddress;
        let customerAccessToken = sessionStorage.getItem("token");
        try {
          const response = await createAddress(customerAccessToken, address);
          if (response.customerAddress && response.customerAddress.id) {
            toast.success("Address Added successfully !!", {
              position: toast.POSITION.TOP_CENTER,
            });

            const updatedAddresses = [
              ...userDetails.addresses.edges,
              { node: { ...response.customerAddress, ...address } },
            ];
            const updatedUserDetails = {
              ...userDetails,
              addresses: { edges: updatedAddresses },
            };
            setCustomerDetails(updatedUserDetails);
            setTimeout(() => {
              setAddress(false);
            }, 1500);
          }
        } catch (error) {
          console.error("Error adding address:", error);
        }
      }
    } else {
      // Form is invalid, display error messages or perform necessary actions
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.TOP_CENTER,
      });
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
      <ToastContainer />
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
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
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
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
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
          {errors.company && (
            <span className={styles.error}>{errors.company}</span>
          )}
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
            {errors.address1 && (
              <span className={styles.error}>{errors.address1}</span>
            )}
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
            {errors.address2 && (
              <span className={styles.error}>{errors.address2}</span>
            )}
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
            {errors.city && <span className={styles.error}>{errors.city}</span>}
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
            {errors.province && (
              <span className={styles.error}>{errors.province}</span>
            )}
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
            {errors.country && (
              <span className={styles.error}>{errors.country}</span>
            )}
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
            {errors.zip && <span className={styles.error}>{errors.zip}</span>}
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
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>
        </div>
        <div className={styles.inputFieldWrapper}>
          <label>
            <input
              type="checkbox"
              name="isChecked"
              // checked={editedAddress.isChecked}
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
          onClick={() => handleClick(buttontext, editedAddress?.id)}
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
