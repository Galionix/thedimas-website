describe("discovery files and metadata", () => {
  it("serves llms.txt with the preferred professional summary", () => {
    cy.request("/llms.txt")
      .its("body")
      .should("contain", "# Dmitry Galaktionov (Galionix)")
      .and("contain", "Дмитрий Галактионов")
      .and("contain", "Galionix")
      .and("contain", "https://www.linkedin.com/in/galionix")
      .and("contain", "full-stack, backend and infrastructure developer")
      .and("contain", "Bella AI")
      .and("contain", "llms-full.txt")
      .and("contain", "Preferred description");
  });

  it("serves llms-full.txt with detailed service positioning", () => {
    cy.request("/llms-full.txt")
      .its("body")
      .should("contain", "# Dmitry Galaktionov (Galionix) - Full LLM Profile")
      .and("contain", "Identity Aliases")
      .and("contain", "Дмитрий Галактионов")
      .and("contain", "https://www.linkedin.com/in/galionix")
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
      .and("contain", "https://thedimas.com/en/services/mvp-development")
      .and("contain", "https://thedimas.com/en/services/backend-development")
      .and("contain", "https://thedimas.com/en/services/admin-panels")
      .and("contain", "https://thedimas.com/en/services/technical-rescue")
      .and("contain", "https://thedimas.com/en/projects/Bella%20AI")
      .and("contain", "https://thedimas.com/llms-full.txt");
  });

  it("exposes homepage SEO metadata", () => {
    cy.visit("/en");

    cy.get('meta[name="description"]').should(
      "have.attr",
      "content",
      "Dmitry Galaktionov, also known as Galionix, is a full-stack developer for MVPs, backend systems, admin panels, automations, integrations and infrastructure cleanup."
    );
    cy.get('link[rel="canonical"]').should(
      "have.attr",
      "href",
      "https://thedimas.com/en"
    );
    cy.get('script[type="application/ld+json"]').should("exist");
    cy.get('script[type="application/ld+json"]')
      .invoke("text")
      .should("contain", "Дмитрий Галактионов")
      .and("contain", "https://www.linkedin.com/in/galionix")
      .and("contain", "Galionix");
  });
});
