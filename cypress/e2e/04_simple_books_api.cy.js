import {
  createApiClient,
  getStatus,
  getBooks,
  getBookById,
  createOrder,
  getOrders,
  deleteOrder,
} from "../support/appActions/api/booksApi";

describe("Simple Books API - Positive & Negative Tests", () => {
  let token;
  let createdOrderId;

  const clientName = `merrin_${Date.now()}`;
  const clientEmail = `merrin_${Date.now()}@example.com`;

  before(() => {
    createApiClient(clientName, clientEmail).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("accessToken");
      token = res.body.accessToken;
    });
  });

  describe("Positive scenarios", () => {
    it("GET /status returns OK", () => {
      getStatus().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("status", "OK");
      });
    });

    it("GET /books returns a non-empty list of books", () => {
      getBooks().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.keys("id", "name", "type", "available");
      });
    });

    it("Create an order (authorized) and verify it appears in GET /orders", () => {
      getBooks().then((res) => {
        const availableBook = res.body.find((b) => b.available === true);
        expect(availableBook, "An available book should exist").to.exist;

        createOrder(token, availableBook.id, "QA Test Customer").then((orderRes) => {
          expect(orderRes.status).to.eq(201);
          expect(orderRes.body).to.have.property("orderId");
          createdOrderId = orderRes.body.orderId;

          getOrders(token).then((ordersRes) => {
            expect(ordersRes.status).to.eq(200);
            expect(ordersRes.body).to.be.an("array");
            const found = ordersRes.body.some((o) => o.id === createdOrderId);
            expect(found, "Created order should be listed").to.eq(true);
          });
        });
      });
    });
  });

  describe("Negative scenarios", () => {
    it("GET /books/:id with invalid id returns 404", () => {
      getBookById(999999, false).then((res) => {
        expect(res.status).to.eq(404);
      });
    });

    it("POST /orders without token returns 401", () => {
      createOrder("", 1, "No Token User", false).then((res) => {
        expect(res.status).to.eq(401);
      });
    });

    it("POST /orders with missing required field returns 400", () => {
      cy.request({
        method: "POST",
        url: "https://simple-books-api.click/orders",
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: {
          customerName: "Missing BookId User", 
        },
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });

  after(() => {
    if (!createdOrderId) return;

    deleteOrder(token, createdOrderId, false).then((res) => {
      expect([200, 204]).to.include(res.status);
    });
  });
});
