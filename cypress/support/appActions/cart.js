export const addProductToCart = (productName) => {
  cy.contains("a", productName, { timeout: 15000 }).click();

  cy.once("window:alert", (text) => {
    expect(text.toLowerCase()).to.include("product added");
  });

  cy.contains("a", "Add to cart").click({ force: true });
  cy.contains("a", "Home").click({ force: true });
};

export const goToCart = () => {
  cy.contains("a", "Cart").click({ force: true });
  cy.url().should("include", "cart.html");
};
