export {};

const routes = [
  {
    path: "/en",
    firstContentSelector: '[data-testid="home-hero-media"]',
  },
  { path: "/en/projects", firstContentSelector: '[class*="cards"]' },
  {
    path: "/en/projects/Bella%20AI",
    firstContentSelector: '[class*="intro"]',
  },
  {
    path: "/en/services/mvp-development",
    firstContentSelector: "main section",
  },
  { path: "/en/blog", firstContentSelector: '[class*="intro"]' },
  { path: "/en/blog/states", firstContentSelector: '[class*="intro"]' },
];

const assertFirstContentStartsBelowHeader = (route: (typeof routes)[number]) => {
  cy.visit(route.path);
  cy.get("header").should("be.visible");
  cy.get(route.firstContentSelector)
    .first()
    .should("be.visible")
    .then(($content) => {
      const headerRect = Cypress.$("header")[0].getBoundingClientRect();
      const contentRect = $content[0].getBoundingClientRect();

      expect(
        contentRect.top,
        `${route.path} first content top`
      ).to.be.greaterThan(headerRect.bottom + 8);
    });
};

describe("fixed header layout", () => {
  routes.forEach((route) => {
    it(`keeps first content below the fixed header on ${route.path}`, () => {
      cy.viewport(1440, 900);
      assertFirstContentStartsBelowHeader(route);
    });
  });

  it("keeps first content below the fixed header on mobile", () => {
    cy.viewport(390, 844);
    assertFirstContentStartsBelowHeader({
      path: "/en/projects/Bella%20AI",
      firstContentSelector: '[class*="intro"]',
    });
    assertFirstContentStartsBelowHeader({
      path: "/en/services/mvp-development",
      firstContentSelector: "main section",
    });
  });
});
