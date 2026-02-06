Cypress.Commands.add("openHome", () => {
  cy.visit("https://www.demoblaze.com/");
  cy.contains("PRODUCT STORE", { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("acceptAlertContains", (textPart) => {
  cy.once("window:alert", (text) => {
    expect(text.toLowerCase()).to.include(textPart.toLowerCase());
  });
});
