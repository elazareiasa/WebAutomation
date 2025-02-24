const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/ui/**/sanity-tests.cy.js",
    // video: true,
    baseUrl: 'https://www.fxempire.com',
    viewportWidth: 1920,
    viewportHeight: 1080, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
