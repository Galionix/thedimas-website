export {};

const contentVisibilityRoutes = [
  "/en",
  "/en/projects",
  "/en/projects/Bella%20AI",
  "/en/projects/Thedimas-Music",
  "/en/projects/UseNotes",
  "/en/projects/5-Hours%20Shop",
  "/en/services/mvp-development",
  "/en/services/backend-development",
  "/en/services/admin-panels",
  "/en/services/technical-rescue",
];

const contentSelectors = [
  '[data-testid="content-paragraph"]',
  '[data-testid="content-list"]',
  '[data-testid="content-list-item"]',
  '[data-testid="content-gallery-caption"]',
  '[data-testid="content-section"]',
  '[data-testid="project-card"]',
  '[data-testid="project-card-media"]',
].join(",");

const slowScrollTo = (targetY: number) => {
  cy.window().then((win) => {
    const startY = win.scrollY;
    const distance = targetY - startY;
    const steps = 18;

    Cypress._.times(steps, (step) => {
      cy.wait(25);
      cy.window().then((stepWin) => {
        stepWin.scrollTo(0, startY + (distance * (step + 1)) / steps);
      });
    });
  });
};

const assertContentBlocksAreRendered = () => {
  cy.get(contentSelectors).each(($element) => {
    const element = $element[0];
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const text = element.textContent?.trim().slice(0, 80) || element.getAttribute("data-testid");

    expect(style.display, `display for ${text}`).not.to.equal("none");
    expect(style.visibility, `visibility for ${text}`).not.to.equal("hidden");
    expect(Number(style.opacity), `opacity for ${text}`).to.be.greaterThan(0.05);
    expect(rect.width, `width for ${text}`).to.be.greaterThan(0);
    expect(rect.height, `height for ${text}`).to.be.greaterThan(0);
  });
};

describe("content visibility after scroll", () => {
  contentVisibilityRoutes.forEach((route) => {
    it(`keeps rendered content visible on ${route}`, () => {
      cy.viewport(1440, 900);
      cy.visit(route);

      cy.document().then((doc) => {
        slowScrollTo(doc.documentElement.scrollHeight);
      });
      slowScrollTo(0);

      assertContentBlocksAreRendered();
    });
  });

  it("keeps Bella AI proof sections visible after repeated scrolls", () => {
    const requiredCopy = [
      "Delivery context",
      "NDA-aware case",
      "Direct client work",
      "Commercial ownership",
      "payment integration",
      "What I owned",
      "Type-safe app architecture",
      "Database and permissions",
      "Authentication and onboarding",
      "Built RBAC",
      "The important portfolio point",
      "Stack signals",
      "Next.js",
      "Supabase/PostgreSQL",
      "Paid audits start at $750",
    ];

    cy.viewport(1440, 900);
    cy.visit("/en/projects/Bella%20AI");

    cy.document().then((doc) => {
      slowScrollTo(doc.documentElement.scrollHeight);
    });
    slowScrollTo(0);
    cy.document().then((doc) => {
      slowScrollTo(doc.documentElement.scrollHeight / 2);
    });

    requiredCopy.forEach((copy) => {
      cy.contains(copy).scrollIntoView().should("be.visible");
    });

    assertContentBlocksAreRendered();
  });
});
