const servicePages = [
  {
    path: "/en/services",
    title: "Full-Stack, Backend and Internal Tool Services | Dimas",
    h1: "Choose the page that matches",
    canonical: "https://thedimas.com/en/services",
    indexPage: true,
  },
  {
    path: "/en/hire-full-stack-developer",
    title: "Contract Full-Stack Developer | React, Next.js, TypeScript | Dimas",
    h1: "Senior full-stack developer available",
    canonical: "https://thedimas.com/en/hire-full-stack-developer",
    segmentText: "Fast recruiter signal",
    hirePage: true,
  },
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
  {
    path: "/en/services/agency-partner",
    title: "Full-Stack Development Partner for Agencies | Dimas",
    h1: "A full-stack partner for agencies",
    canonical: "https://thedimas.com/en/services/agency-partner",
    segmentText: "Built for",
  },
  {
    path: "/en/services/founder-mvp",
    title: "Full-Stack MVP Developer for Founders | Dimas",
    h1: "A practical full-stack developer for founders",
    canonical: "https://thedimas.com/en/services/founder-mvp",
    segmentText: "Built for",
  },
  {
    path: "/en/services/internal-tools-automation",
    title: "Internal Tools and Automation Developer | Dimas",
    h1: "Internal tools, admin panels and integrations",
    canonical: "https://thedimas.com/en/services/internal-tools-automation",
    segmentText: "Why this is credible",
  },
  {
    path: "/en/services/contract-full-stack-developer",
    title: "Contract Full-Stack Developer | React, Next.js, TypeScript | Dimas",
    h1: "Senior full-stack developer available",
    canonical: "https://thedimas.com/en/services/contract-full-stack-developer",
    segmentText: "Built for",
  },
];

const ukrainianServicePages = [
  {
    path: "/ua/services",
    h1: "Обери сторінку",
    canonical: "https://thedimas.com/ua/services",
    cta: "Зв'язатися",
    nav: "Послуги",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/hire-full-stack-developer",
    h1: "Senior full-stack developer",
    canonical: "https://thedimas.com/ua/hire-full-stack-developer",
    cta: "Зв'язатися",
    nav: "Послуги",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/mvp-development",
    h1: "MVP розробка",
    canonical: "https://thedimas.com/ua/services/mvp-development",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/backend-development",
    h1: "Backend розробка",
    canonical: "https://thedimas.com/ua/services/backend-development",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/admin-panels",
    h1: "Розробка адмінок",
    canonical: "https://thedimas.com/ua/services/admin-panels",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/technical-rescue",
    h1: "Technical rescue",
    canonical: "https://thedimas.com/ua/services/technical-rescue",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/agency-partner",
    h1: "Full-stack партнер",
    canonical: "https://thedimas.com/ua/services/agency-partner",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/founder-mvp",
    h1: "Практичний full-stack",
    canonical: "https://thedimas.com/ua/services/founder-mvp",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/internal-tools-automation",
    h1: "Internal tools",
    canonical: "https://thedimas.com/ua/services/internal-tools-automation",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
  },
  {
    path: "/ua/services/contract-full-stack-developer",
    h1: "Senior full-stack developer",
    canonical: "https://thedimas.com/ua/services/contract-full-stack-developer",
    cta: "Зв'язатися",
    nav: "Послуги",
    caseLink: "Кейс Bella AI",
    forbiddenCta: "Contact me",
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
        .should((text) => {
          if (service.indexPage) {
            expect(text).to.be.a("string");
            return;
          }
          expect(text).to.contain(service.hirePage ? "Person" : "FAQPage");
        });
      cy.contains("Contact me")
        .should("be.visible")
        .and("have.attr", "href")
        .and("contain", "/en#contact");
      if (!service.indexPage && !service.hirePage) {
        cy.contains("Bella AI case")
          .should("be.visible")
          .and("have.attr", "href")
          .and("contain", "/en/projects/Bella%20AI");
      }
      if (service.segmentText) {
        cy.contains(service.segmentText).should("be.visible");
      }
    });
  });

  ukrainianServicePages.forEach((service) => {
    it(`serves ${service.path} with Ukrainian navigation and translated CTAs`, () => {
      cy.visit(service.path);

      cy.contains("h1", service.h1).should("be.visible");
      cy.get('link[rel="canonical"]').should(
        "have.attr",
        "href",
        service.canonical
      );
      cy.contains("a", service.nav).should("be.visible");
      cy.contains(service.cta)
        .should("be.visible")
        .and("have.attr", "href")
        .and("contain", "/ua#contact");
      cy.get("body").should("not.contain.text", service.forbiddenCta);

      if (service.caseLink) {
        cy.contains(service.caseLink)
          .should("be.visible")
          .and("have.attr", "href")
          .and("contain", "/ua/projects/Bella%20AI");
      }
    });
  });

  it("switches service detail pages between locales without losing the nested route", () => {
    cy.visit("/en/services/agency-partner");
    cy.contains("a", "Services").should("be.visible");
    cy.contains("button", /^ua$/i).click();
    cy.location("pathname").should("match", /^(\/ua)?\/services\/agency-partner$/);
    cy.contains("a", "Послуги").should("be.visible");
    cy.contains("Кейс Bella AI").should("be.visible");

    cy.contains("button", /^en$/i).click();
    cy.location("pathname").should("eq", "/en/services/agency-partner");
    cy.contains("a", "Services").should("be.visible");
    cy.contains("Bella AI case").should("be.visible");
  });
});
