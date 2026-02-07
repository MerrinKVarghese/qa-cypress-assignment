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
  - Negative: case 1:login rejected (wrong password)
              case2:login rejected (empty password)
  - Positive: case1: About us validation
              case2 :Contact form submit shows success alert
 
## API Tests – Simple Books API

Base URL: https://simple-books-api.click

Covered scenarios:
- GET /status
- GET /books
- Create API client and token
- Create order (authorized)
- Verify order via GET /orders

Negative scenarios:
- Invalid book ID (404)
- Create order without token (401)
- Create order with missing required fields (400)


## Project Structure

- `cypress/e2e/` → Cypress specs (UI/API tests)
- `cypress/support/` → reusable commands + appActions

## How to Run Locally

Install dependencies:
```bash
npm install
