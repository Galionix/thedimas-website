export {};

describe("blog content", () => {
  it("shows the new English posts on the blog index and serves their detail pages", () => {
    cy.visit("/en/blog");

    cy.contains("AI agents as working memory").should("be.visible");
    cy.contains("A portfolio should prove thinking").should("be.visible");
    cy.get('img[src*="ai-agents-working-memory"]').should("be.visible");
    cy.get('img[src*="portfolio-proof-of-thinking"]').should("be.visible");

    cy.visit("/en/blog/ai-agents-working-memory");
    cy.contains("Do not ask the model to be smart. Give it a system.").should(
      "be.visible"
    );
    cy.get('img[src*="ai-agents-working-memory"]').should("be.visible");

    cy.visit("/en/blog/portfolio-proof-of-thinking");
    cy.contains("A gallery is not a case study").should("be.visible");
    cy.get('img[src*="portfolio-proof-of-thinking"]').should("be.visible");
  });

  it("shows the new Ukrainian posts on the blog index and serves their detail pages", () => {
    cy.visit("/ua/blog");

    cy.contains("AI-агенти як робоча пам'ять").should("be.visible");
    cy.contains("Портфоліо має доводити мислення").should("be.visible");
    cy.get('img[src*="ai-agents-working-memory"]').should("be.visible");
    cy.get('img[src*="portfolio-proof-of-thinking"]').should("be.visible");

    cy.visit("/ua/blog/ai-agents-working-memory");
    cy.contains("Не просити модель бути розумною, а давати їй систему").should(
      "be.visible"
    );
    cy.get('img[src*="ai-agents-working-memory"]').should("be.visible");

    cy.visit("/ua/blog/portfolio-proof-of-thinking");
    cy.contains("Галерея - це не кейс").should("be.visible");
    cy.get('img[src*="portfolio-proof-of-thinking"]').should("be.visible");
  });
});
