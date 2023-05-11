import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import styles from "../../pages/account/account.module.css";
import AddressForm from "./editadressform";
import { deleteCustomerAddress } from "../../../utils/shopify";
import { ToastContainer, toast } from "react-toastify";

function AddressBook(props) {
  let { userDetails, setCustomerDetails } = props;
  let details = userDetails?.addresses.edges;
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [address, setAddress] = useState(false);

  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const handleEdit = (id) => {
    setEditingAddressId(id);
  };

  const handleRemove = async (addressId) => {
    const customerToken = sessionStorage.getItem("token");
    deleteCustomerAddress(customerToken, addressId)
      .then((deletedAddressId) => {
        const updatedDetails = userDetails.addresses.edges.filter(
          (address) => address.node.id !== addressId
        );
        const updatedUserDetails = {
          ...userDetails,
          addresses: { edges: updatedDetails },
        };
        setCustomerDetails(updatedUserDetails);
        toast.success("Address Removed successfully !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error deleting address:", error.message);
      });
  };

  const handleAddAddress = () => {
    setAddress(true);
  };

  return (
    <div>
      <ToastContainer />
      <h4> My Address Book</h4>
      {address === true ? (
        <div style={{ width: "30%", margin: "30px 0" }}>
          <AddressForm
            userDetails={userDetails}
            setCustomerDetails={setCustomerDetails}
            setEditingAddressId={setEditingAddressId}
            setAddress={setAddress}
            title={"Add New Address"}
            buttontext={"Submit"}
            buttontext2={"Cancel"}
          />
        </div>
      ) : (
        <div style={{ margin: "15px 0" }}>
          <button
            className={styles.editButton}
            onClick={() => handleAddAddress()}
          >
            Add a new Address
          </button>
        </div>
      )}

      <div>
        <Row>
          {details &&
            details.map((detail, index) => (
              <Col key={detail.node.id} md={4} className="mb-4">
                {editingAddressId === detail.node.id ? (
                  <Card className={styles.addressCard}>
                    <Card.Body>
                      <AddressForm
                        address={detail.node}
                        setEditingAddressId={setEditingAddressId}
                        title={"Edit Address"}
                        buttontext={"Update"}
                        buttontext2={"Close"}
                        userDetails={userDetails}
                        setCustomerDetails={setCustomerDetails}
                      />
                    </Card.Body>
                  </Card>
                ) : (
                  <Card className={styles.addressCard}>
                    <Card.Body>
                      <Card.Title className={styles.addressName}>
                        {capitalizeFirstLetter(detail.node.firstName)}{" "}
                        {capitalizeFirstLetter(detail.node.lastName)}
                      </Card.Title>
                      <div className={styles.addressDetails}>
                        <span>{detail.node.address1} </span>
                        {detail.node.address2 && (
                          <span>{detail.node.address2}</span>
                        )}
                        <span>{detail.node.city}, </span>
                        <span>{detail.node.province} </span>
                        <span>{detail.node.country} </span>
                        <span>{detail.node.zip} </span>
                        <span style={{ cursor: "pointer" }}>
                          {detail.node.isDefault === true ? (
                            <Badge bg="dark">Default</Badge>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>

                      <div className={styles.buttonsContainer}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(detail.node.id)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.removeButton}
                          onClick={() => handleRemove(detail.node.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default AddressBook;
