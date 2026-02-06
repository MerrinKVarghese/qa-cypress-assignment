import { openLoginModal } from "../support/appActions/auth";

describe("Demoblaze - Negative scenarios", () => {

  it("Negative: login is rejected for wrong password and empty password", () => {
    cy.openHome();

    openLoginModal();

    const username = "testuser_demo";

    // Case 1: Wrong password
    cy.get("#loginusername").clear().type(username);
    cy.get("#loginpassword").clear().type("WrongPassword123");

    cy.once("window:alert", (text) => {
      const msg = text.toLowerCase();
      expect(msg).to.satisfy((m) =>
        m.includes("wrong password") || m.includes("user does not exist") || m.includes("wrong")
      );
    });

    cy.get("#logInModal").contains("button", "Log in").click({ force: true });
    cy.get("#logInModal").should("be.visible");

    // Case 2: Empty password
    cy.get("#loginusername").clear().type(username);

    cy.get("#loginpassword")
      .focus()
      .type("{selectall}{backspace}", { force: true })
      .should("have.value", "");

    cy.once("window:alert", (text) => {
      const msg = text.toLowerCase();
      expect(msg).to.satisfy((m) =>
        m.includes("please fill out username and password") ||
        m.includes("wrong password") ||
        m.includes("user does not exist") ||
        m.includes("wrong")
      );
    });

    cy.get("#logInModal").contains("button", "Log in").click({ force: true });
    cy.get("#logInModal").should("be.visible");

    cy.get("#logInModal").contains("button", "Close").click({ force: true });
    cy.get("#logInModal").should("not.be.visible");

    cy.get("#nameofuser").should("not.be.visible");
  });

});
