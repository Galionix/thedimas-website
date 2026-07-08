export {};

const routes = [
  {
    path: "/en",
    firstContentSelector: '[data-testid="home-hero-media"]',
  },
  {
    path: "/en/projects",
    firstContentSelector: '[class*="cards"]',
    maxHeaderGap: 1,
  },
  {
    path: "/en/projects/Bella%20AI",
    firstContentSelector: '[class*="intro"]',
    maxHeaderGap: 1,
  },
  {
    path: "/en/services/mvp-development",
    firstContentSelector: "main section",
  },
  {
    path: "/en/blog",
    firstContentSelector: '[class*="intro"]',
    maxHeaderGap: 1,
  },
  {
    path: "/en/blog/states",
    firstContentSelector: '[class*="intro"]',
    maxHeaderGap: 1,
  },
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
      ).to.be.at.least(headerRect.bottom - 1);

      if (route.maxHeaderGap !== undefined) {
        expect(
          contentRect.top - headerRect.bottom,
          `${route.path} gap below fixed header`
        ).to.be.lessThan(route.maxHeaderGap + 1);
      }
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
      maxHeaderGap: 1,
    });
    assertFirstContentStartsBelowHeader({
      path: "/en/services/mvp-development",
      firstContentSelector: "main section",
    });
  });
});
