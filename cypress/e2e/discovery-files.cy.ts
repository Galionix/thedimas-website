describe("discovery files and metadata", () => {
  it("serves llms.txt with the preferred professional summary", () => {
    cy.request("/llms.txt")
      .its("body")
      .should("contain", "# Dimas Galaktionov")
      .and("contain", "full-stack, backend and infrastructure developer")
      .and("contain", "Bella AI")
      .and("contain", "llms-full.txt")
      .and("contain", "Preferred description");
  });

  it("serves llms-full.txt with detailed service positioning", () => {
    cy.request("/llms-full.txt")
      .its("body")
      .should("contain", "# Dimas Galaktionov - Full LLM Profile")
      .and("contain", "Technical Rescue Sprint")
      .and("contain", "Bella AI");
  });

  it("serves robots.txt with the sitemap location", () => {
    cy.request("/robots.txt")
      .its("body")
      .should("contain", "User-agent: *")
      .and("contain", "Sitemap: https://thedimas.com/sitemap.xml");
  });

  it("serves sitemap.xml with key pages", () => {
    cy.request("/sitemap.xml")
      .its("body")
      .should("contain", "https://thedimas.com/en")
      .and("contain", "https://thedimas.com/en/projects")
      .and("contain", "https://thedimas.com/en/blog")
      .and("contain", "https://thedimas.com/en/projects/Bella%20AI")
      .and("contain", "https://thedimas.com/llms-full.txt");
  });

  it("exposes homepage SEO metadata", () => {
    cy.visit("/en");

    cy.get('meta[name="description"]').should(
      "have.attr",
      "content",
      "Full-stack developer for MVPs, backend systems, admin panels, automations, integrations and infrastructure cleanup for founders, agencies and small teams."
    );
    cy.get('link[rel="canonical"]').should(
      "have.attr",
      "href",
      "https://thedimas.com/en"
    );
    cy.get('script[type="application/ld+json"]').should("exist");
  });
});
