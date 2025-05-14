const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //defaultCommandTimeout: 1000
    //experimentalStudio: true
    video: true,
    baseUrl: 'http://localhost:3000',
    //viewportHeight: 1440,
    //viewportHeight: 900
  },
});
