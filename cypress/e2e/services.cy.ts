const servicePages = [
  {
    path: "/en/services/mvp-development",
    title: "MVP Development with Next.js, Backend and Deployment | Dimas",
    h1: "MVP development for founders",
    canonical: "https://thedimas.com/en/services/mvp-development",
  },
  {
    path: "/en/services/backend-development",
    title: "Backend Developer for APIs, Auth and Integrations | Dimas",
    h1: "Backend development for products",
    canonical: "https://thedimas.com/en/services/backend-development",
  },
  {
    path: "/en/services/admin-panels",
    title: "Admin Panel and Internal Tool Developer | Dimas",
    h1: "Admin panel development",
    canonical: "https://thedimas.com/en/services/admin-panels",
  },
  {
    path: "/en/services/technical-rescue",
    title: "Technical Rescue for Messy Web Projects | Dimas",
    h1: "Technical rescue for messy web projects",
    canonical: "https://thedimas.com/en/services/technical-rescue",
  },
];

describe("service landing pages", () => {
  servicePages.forEach((service) => {
    it(`serves ${service.path} with commercial SEO and CTA`, () => {
      cy.visit(service.path);

      cy.title().should("eq", service.title);
      cy.contains("h1", service.h1).should("be.visible");
      cy.get('link[rel="canonical"]').should(
        "have.attr",
        "href",
        service.canonical
      );
      cy.get('meta[name="description"]')
        .should("have.attr", "content")
        .and("not.be.empty");
      cy.get('script[type="application/ld+json"]')
        .invoke("text")
        .should("contain", "FAQPage")
        .and("contain", "Service");
      cy.contains("Contact me")
        .should("be.visible")
        .and("have.attr", "href")
        .and("contain", "/en#contact");
      cy.contains("Bella AI case")
        .should("be.visible")
        .and("have.attr", "href")
        .and("contain", "/en/projects/Bella%20AI");
    });
  });
});
