# Cypress Tests - Search, Navbar, and API

## Features Tested
1. **Search Component**: Verifies rendering and functionality of the search bar.
2. **Navbar Component**: Tests navbar rendering and menu functionality.
3. **API Test**: Validates the `GET Top Articles` API response structure.

## Improvements
- Replaced unstable class selectors with `data-name` attributes for more reliable test targeting.
- Replaced `cy.wait()` with `cy.intercept()` for better API request handling and faster tests.

## Setup
1. Ensure you have Node.js and npm installed. From the HomeAssignment folder, run:
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npx cypress run
   ```

## Known Issues
- The `GET Top Articles` test expects 5 articles but the API returns 4.
- The test checks for `url` and `publishedAt`, but the response contains `articleLink` and `publishedDate`.
