const baseUrl = "https://simple-books-api.click";

export const createApiClient = (clientName, clientEmail) => {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/api-clients/`,
    headers: { "Content-Type": "application/json" },
    body: { clientName, clientEmail },
  });
};

export const getStatus = () => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/status`,
  });
};

export const getBooks = () => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/books`,
  });
};

export const getBookById = (bookId, failOnStatusCode = true) => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/books/${bookId}`,
    failOnStatusCode,
  });
};

export const createOrder = (token, bookId, customerName, failOnStatusCode = true) => {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/orders`,
    failOnStatusCode,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: { bookId, customerName },
  });
};

export const getOrders = (token) => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/orders`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteOrder = (token, orderId, failOnStatusCode = true) => {
  return cy.request({
    method: "DELETE",
    url: `${baseUrl}/orders/${orderId}`,
    failOnStatusCode,
    headers: { Authorization: `Bearer ${token}` },
  });
};
