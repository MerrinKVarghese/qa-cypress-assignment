# QA Automation Assignment (Cypress)

This repository contains UI and API automation tests implemented using **Cypress**.

## Scope

### UI Tests (Demoblaze)
Target: https://www.demoblaze.com/

Covered scenarios:
- Main flow:
  - Sign up (create account)
  - Login
  - Add any 3 products to cart
  - Validate total amount
  - Delete a product
  - Validate total again
  - Place an order (Purchase)
- Additional tests:
  - Negative: login rejected (wrong password + empty password)
  - Positive: Contact form submit shows success alert

### API Tests (Simple Books API)
Reference: https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md  
Base URL: https://simple-books-api.click

(Coming in this repository: 2–3 positive + 2–3 negative API tests using `cy.request()`)

## Project Structure

- `cypress/e2e/` → Cypress specs (UI/API tests)
- `cypress/support/` → reusable commands + appActions

## How to Run Locally

Install dependencies:
```bash
npm install
