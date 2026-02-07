import { aboutUs } from "../support/appActions/aboutUs";

describe("Demoblaze - Positive edge cases", () => {

   it("Positive: About Us modal opens, video exists, and closes", () => {
    cy.openHome();
    aboutUs.openAndValidate();
  });

  it("Positive: Contact form can be opened and submitted (alert appears)", () => {
    cy.openHome();

    // Open Contact modal
    cy.contains("a", "Contact", { timeout: 15000 }).click({ force: true });
    cy.get("#exampleModal", { timeout: 15000 }).should("be.visible");

    // Fill contact form
    cy.get("#recipient-email").clear().type("test@mail.com");
    cy.get("#recipient-name").clear().type("Merrin");
    cy.get("#message-text").clear().type("Hello! This is for testing Contact message.");

    // Validate alert on submit 
    cy.once("window:alert", (text) => {
      expect(text.toLowerCase()).to.include("thanks");
    });

    cy.get("#exampleModal").contains("button", "Send message").click({ force: true });

    cy.get("#exampleModal").should("not.be.visible");
  });

 

});
