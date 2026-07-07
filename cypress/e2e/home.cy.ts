describe("home page", () => {
  it("shows the commercial positioning on the English homepage", () => {
    cy.visit("/en");

    cy.title().should(
      "eq",
      "Dimas Galaktionov | Full-stack, Backend & Infrastructure Developer"
    );

    cy.contains("Full-stack developer for products").should("be.visible");
    cy.contains(
      "I build, repair and ship web products, admin panels"
    ).should("be.visible");
    cy.get("body").should("contain.text", "What you can hire me for");
    cy.get("body").should("contain.text", "Bella AI");
    cy.contains("Discuss a project")
      .should("be.visible")
      .invoke("attr", "href")
      .should("contain", "mailto:galionix2@gmail.com");
  });

  it("keeps the main navigation routes available", () => {
    cy.visit("/en");

    cy.contains("a", "Projects").should("have.attr", "href", "/en/projects");
    cy.contains("a", "Blog").should("have.attr", "href", "/en/blog");

    cy.visit("/en/projects");
    cy.location("pathname").should("eq", "/en/projects");
    cy.get("body").should("contain.text", "Bella AI");
    cy.get("body").should("contain.text", "Focus Blocker");

    cy.visit("/en/blog");
    cy.location("pathname").should("eq", "/en/blog");
    cy.get("body").should("contain.text", "My blog");
  });
});
