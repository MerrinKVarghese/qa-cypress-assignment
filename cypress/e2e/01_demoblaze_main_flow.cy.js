describe("Demoblaze - Main Flow (Stable E2E)", () => {
  const user = {
    username: `user_${Date.now()}`,
    password: "Test123!",
  };

  const products = ["Samsung galaxy s6", "Nokia lumia 1520", "Nexus 6"];

  const waitForHomeProducts = () => {
    cy.intercept("GET", "**/entries**").as("entries");
    cy.openHome(); // from commands.js
    cy.wait("@entries");
    cy.get(".card-title, .hrefch", { timeout: 15000 }).should("have.length.greaterThan", 0);
  };

  const signup = () => {
    cy.intercept("POST", "**/signup").as("signup");

    waitForHomeProducts();

    // use stable ID instead of text to avoid clicking wrong element
    cy.get("#signin2", { timeout: 15000 }).click({ force: true });
    cy.get("#signInModal", { timeout: 15000 }).should("be.visible");

    cy.get("#sign-username").clear().type(user.username);
    cy.get("#sign-password").clear().type(user.password);

    cy.acceptAlertContains("sign"); // from commands.js (accepts + asserts)

    cy.get("#signInModal").contains("button", "Sign up").click({ force: true });
    cy.wait("@signup");
  };

  const login = () => {
    cy.intercept("POST", "**/login").as("login");

    waitForHomeProducts();

    cy.get("#login2", { timeout: 15000 }).click({ force: true });
    cy.get("#logInModal", { timeout: 15000 }).should("be.visible");

    cy.get("#loginusername").clear().type(user.username);
    cy.get("#loginpassword").clear().type(user.password);

    cy.get("#logInModal").contains("button", "Log in").click({ force: true });
    cy.wait("@login");

    cy.get("#nameofuser", { timeout: 15000 })
      .should("be.visible")
      .and("contain", `Welcome ${user.username}`);
  };

  const addProductToCart = (productName) => {
    cy.intercept("POST", "**/addtocart").as("addtocart");

    cy.contains("a", productName, { timeout: 15000 }).should("be.visible").click();
    cy.contains("a", "Add to cart", { timeout: 15000 }).should("be.visible");

    cy.acceptAlertContains("product added");
    cy.contains("a", "Add to cart").click({ force: true });

    cy.wait("@addtocart");

    // back home and wait for entries again to avoid stale state
    cy.intercept("GET", "**/entries**").as("entriesAgain");
    cy.contains("a", "Home").click({ force: true });
    cy.wait("@entriesAgain");
  };

  const goToCart = () => {
    cy.intercept("POST", "**/viewcart").as("viewcart");
    cy.contains("a", "Cart").click({ force: true });
    cy.wait("@viewcart");

    cy.url().should("include", "cart.html");
    cy.get("#tbodyid tr", { timeout: 15000 }).should("exist");
  };

  const getRowPricesSum = () => {
    return cy.get("#tbodyid tr").then(($rows) => {
      const prices = [...$rows].map((row) => {
        const priceCell = row.querySelector("td:nth-child(3)");
        return Number((priceCell?.innerText || "0").trim());
      });
      return prices.reduce((a, b) => a + b, 0);
    });
  };

  const getDisplayedTotal = () => {
    return cy.get("#totalp").invoke("text").then((t) => Number(t.trim() || "0"));
  };

  const assertTotalMatchesRows = () => {
    getRowPricesSum().then((expected) => {
      getDisplayedTotal().then((total) => {
        expect(total).to.eq(expected);
      });
    });
  };

  const deleteFirstItemAndWait = () => {
    cy.intercept("POST", "**/deleteitem").as("deleteitem");

    cy.get("#tbodyid tr").then(($rowsBefore) => {
      const beforeCount = $rowsBefore.length;

      cy.get("#tbodyid tr").first().within(() => {
        cy.contains("a", "Delete").click({ force: true });
      });

      cy.wait("@deleteitem");

      cy.get("#tbodyid tr", { timeout: 15000 }).should(($rowsAfter) => {
        expect($rowsAfter.length).to.be.lessThan(beforeCount);
      });
    });
  };

  const placeOrder = () => {
    cy.contains("button", "Place Order", { timeout: 15000 }).click({ force: true });
    cy.get("#orderModal", { timeout: 15000 }).should("be.visible");

    cy.get("#name").clear().type("Test User");
    cy.get("#country").clear().type("Germany");
    cy.get("#city").clear().type("Berlin");
    cy.get("#card").clear().type("4111111111111111");
    cy.get("#month").clear().type("12");
    cy.get("#year").clear().type("2030");

    cy.get("#orderModal").contains("button", "Purchase").click({ force: true });

    cy.get(".sweet-alert", { timeout: 15000 }).should("be.visible");
    cy.get(".sweet-alert h2").should("contain", "Thank you");
    cy.contains("button", "OK").click({ force: true });
  };

  it("Main Flow: Signup -> Login -> Add 3 products -> Validate total -> Delete -> Validate -> Order", () => {
    signup();
    login();

    products.forEach((p) => addProductToCart(p));

    goToCart();
    assertTotalMatchesRows();

    deleteFirstItemAndWait();
    assertTotalMatchesRows();

    placeOrder();
  });
});
