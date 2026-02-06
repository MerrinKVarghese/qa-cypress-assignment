export const openLoginModal = () => {
  cy.get("#login2", { timeout: 15000 }).click({ force: true });
  cy.get("#logInModal", { timeout: 15000 }).should("be.visible");
};

export const openSignupModal = () => {
  cy.get("#signin2", { timeout: 15000 }).click({ force: true });
  cy.get("#signInModal", { timeout: 15000 }).should("be.visible");
};

export const signup = (username, password) => {
  openSignupModal();
  cy.get("#sign-username").clear().type(username);
  cy.get("#sign-password").clear().type(password);
  cy.once("window:alert", () => {}); // accept any signup alert
  cy.get("#signInModal").contains("button", "Sign up").click({ force: true });
};

export const login = (username, password) => {
  openLoginModal();
  cy.get("#loginusername").clear().type(username);
  cy.get("#loginpassword").clear().type(password);
  cy.get("#logInModal").contains("button", "Log in").click({ force: true });
};


