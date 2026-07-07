import { defineConfig } from "cypress";

const visualTarget = process.env.CYPRESS_VISUAL_TARGET;

export default defineConfig({
  screenshotsFolder: visualTarget
    ? `cypress/visual-snapshots/${visualTarget}`
    : "cypress/screenshots",
  e2e: {
    baseUrl: "http://127.0.0.1:3001",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    screenshotOnRunFailure: true,
  },
});
