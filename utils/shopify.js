const storefrontAccessToken = `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN}`;
const endpoint = "https://fashionstroe.myshopify.com/api/2023-04/graphql.json";
import { gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            options {
              name
              values
            }
            images(first: 2) {
              edges {
                node {
                  originalSrc
                }
              }
            }

            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCart(itemId, quantity) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    const data = await graphQLClient.request(createCartMutation, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const data = await graphQLClient.request(updateCartMutation, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    originalSrc
                  }
                  product {
                    id
                    handle
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export const getProduct = async (id) => {
  const productQuery = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }

        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(productQuery, variables);
    return data.product;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };

  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};

export async function deleteCartItem(cartId, lineIds) {
  const removeLineItemMutation = gql`
    mutation removeLineItem($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      originalSrc
                    }
                    product {
                      id
                      handle
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lineIds: [lineIds],
  };

  try {
    const data = await graphQLClient.request(removeLineItemMutation, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProductQuantity(cartId, lineIds, qty) {
  const UpdateProductQuantity = gql`
    mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  let variables = {
    cartId: cartId,
    lines: { id: lineIds, quantity: qty },
  };
  try {
    const data = await graphQLClient.request(UpdateProductQuantity, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createCustomer(firstName, lastName, email, password) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  };

  const data = await graphQLClient.request(mutation, variables);

  return data.customerCreate;
}
export async function createAddress(customerAccessToken, address) {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: customerAccessToken,
    address: address,
  };

  const data = await graphQLClient.request(mutation, variables);

  return data.customerAddressCreate;
}
export async function updateAddress(customerAccessToken, addressId, address) {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: customerAccessToken,
    id: addressId,
    address: address,
  };

  const data = await graphQLClient.request(mutation, variables);

  return data.customerAddressUpdate;
}

export async function login(email, password) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email: email,
      password: password,
    },
  };

  const data = await graphQLClient.request(mutation, variables);

  return data.customerAccessTokenCreate;
}

export async function getCustomerOrders(customerToken) {
  const getCustomerOrdersQuery = gql`
    query GetCustomerOrders($customerToken: String!) {
      customer(customerAccessToken: $customerToken) {
        id
        firstName
        lastName
        email
        addresses(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
              address1
              address2
              city
              province
              country
              zip
              phone
              formatted(withName: true)
              company
            }
          }
        }
        defaultAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
          formatted(withName: true)
        }
        orders(first: 10) {
          nodes {
            id
            orderNumber
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const variables = {
    customerToken: customerToken,
  };

  try {
    const response = await graphQLClient.request(
      getCustomerOrdersQuery,
      variables
    );

    // Identify the default address
    const defaultAddressId = response?.customer?.defaultAddress.id;
    // Set the 'isDefault' field for each address
    response?.customer?.addresses?.edges?.forEach((edge) => {
      const addressId = edge?.node.id;
      edge.node.isDefault = addressId === defaultAddressId;
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrderById(orderId) {
  const getOrderByIdQuery = gql`
  query {
    node(id: "gid://shopify/Order/${orderId}") {
      ... on Order {
        id
        orderNumber
        processedAt
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              variant {
                id
                price {
                  amount
                }
                sku
                product {
                  id
                  title
                  description
                  handle
                  # Add any additional fields you need
                }
              }
              originalTotalPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

  try {
    const response = await graphQLClient.request(getOrderByIdQuery);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteCustomerAddress(customerToken, addressId) {
  const deleteCustomerAddressMutation = gql`
    mutation DeleteCustomerAddress(
      $customerAccessToken: String!
      $addressId: ID!
    ) {
      customerAddressDelete(
        customerAccessToken: $customerAccessToken
        id: $addressId
      ) {
        customerUserErrors {
          field
          message
        }
        deletedCustomerAddressId
      }
    }
  `;

  const variables = {
    customerAccessToken: customerToken,
    addressId: addressId,
  };

  try {
    const response = await graphQLClient.request(
      deleteCustomerAddressMutation,
      variables
    );

    if (response.customerAddressDelete.customerUserErrors.length > 0) {
      // Error occurred while deleting the address
      throw new Error(
        response.customerAddressDelete.customerUserErrors[0].message
      );
    }

    // Address deleted successfully
    return response.customerAddressDelete.deletedCustomerAddressId;
  } catch (error) {
    throw new Error(error);
  }
}
