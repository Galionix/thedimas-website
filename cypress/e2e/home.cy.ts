describe("home page", () => {
  it("shows the commercial positioning on the English homepage", () => {
    cy.visit("/en");

    cy.title().should(
      "eq",
      "Dmitry Galaktionov (Galionix) | Full-stack, Backend & Infrastructure Developer"
    );

    cy.contains("Full-stack developer for products").should("be.visible");
    cy.contains(
      "I build, repair and ship web products, admin panels"
    ).should("be.visible");
    cy.get("body").should("contain.text", "What you can hire me for");
    cy.get("body").should("contain.text", "Dmitry Galaktionov");
    cy.get("body").should("contain.text", "Дмитрий Галактионов");
    cy.get("body").should("contain.text", "Galionix");
    cy.get("body").should("contain.text", "Bella AI");
    cy.contains("MVP or feature sprint")
      .should("have.attr", "href", "/en/services/mvp-development");
    cy.contains("Backend and integration work")
      .should("have.attr", "href", "/en/services/backend-development");
    cy.contains("Internal tools and admin panels")
      .should("have.attr", "href", "/en/services/admin-panels");
    cy.contains("Technical rescue sprint")
      .should("have.attr", "href", "/en/services/technical-rescue");
    cy.contains("Discuss a project")
      .should("be.visible")
      .invoke("attr", "href")
      .should("contain", "mailto:galionix2@gmail.com");
    cy.get('a[aria-label="LinkedIn"]')
      .should("have.attr", "href", "https://www.linkedin.com/in/galionix")
      .and("have.attr", "target", "_blank");
  });

  it("keeps the main navigation routes available", () => {
    cy.visit("/en");

    cy.contains("a", "Projects").should("have.attr", "href", "/en/projects");
    cy.contains("a", "Services").should("have.attr", "href", "/en/services");
    cy.contains("a", "Blog").should("have.attr", "href", "/en/blog");

    cy.visit("/en/projects");
    cy.location("pathname").should("eq", "/en/projects");
    cy.get("body").should("contain.text", "Bella AI");
    cy.get("body").should("contain.text", "Focus Blocker");

    cy.visit("/en/services");
    cy.location("pathname").should("eq", "/en/services");
    cy.get("body").should("contain.text", "Choose the page that matches");
    cy.contains("a", "Services").should("be.visible");

    cy.visit("/en/blog");
    cy.location("pathname").should("eq", "/en/blog");
    cy.get("body").should("contain.text", "My blog");
  });

  it("sends lead source metadata with quick contact submissions", () => {
    cy.intercept("POST", "/api/contact", (req) => {
      expect(req.body.email).to.equal("lead@example.com");
      expect(req.body.source.cta).to.equal("quick_contact_form");
      expect(req.body.source.locale).to.equal("en");
      expect(req.body.source.page).to.contain("/en?utm_source=google");
      expect(req.body.source.utmSource).to.equal("google");
      expect(req.body.source.utmMedium).to.equal("organic");
      expect(req.body.source.utmCampaign).to.equal("service-pages");

      req.reply({
        statusCode: 200,
        body: { ok: true },
      });
    }).as("contactRequest");

    cy.visit("/en?utm_source=google&utm_medium=organic&utm_campaign=service-pages");
    cy.get('input[name="email"]').type("lead@example.com");
    cy.contains("button", "Contact me").click();
    cy.wait("@contactRequest");
    cy.contains("Sent. I will reply by email.").should("be.visible");
  });

  it("keeps homepage section copy visible after slow scrolling down and back up", () => {
    const keyCopy = [
      "Full-stack developer for products",
      "I build, repair and ship web products",
      "Quick contact",
      "Dmitry Galaktionov (Galionix): full-stack",
      "Search aliases: Dmitry Galaktionov",
      "Дмитрий Галактионов",
      "I am useful when the project is messy",
      "What you can hire me for",
      "MVP or feature sprint",
      "Backend and integration work",
      "Internal tools and admin panels",
      "Technical rescue sprint",
      "Commercial proof",
      "At Bella AI I worked on a production driving-school management platform",
      "Why this is a safe bet",
      "End-to-end ownership",
      "Type-safe delivery",
      "Practical communication",
      "Fast first step",
      "Personal MVPs and prototypes",
      "These are smaller self-contained projects",
    ];
    const checkedViewports = [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 900 },
    ];

    const slowScrollTo = (targetY: number) => {
      cy.window().then((win) => {
        const startY = win.scrollY;
        const distance = targetY - startY;
        const steps = 24;

        Cypress._.times(steps, (step) => {
          cy.wait(40);
          cy.window().then((stepWin) => {
            stepWin.scrollTo(0, startY + (distance * (step + 1)) / steps);
          });
        });
      });
    };

    const findElementByText = (doc: Document, text: string) => {
      const selectors = [
        "h1",
        "h2",
        "h3",
        "p",
        "strong",
        "span",
        "a",
        "button",
        "li",
      ].join(",");

      return Array.from(doc.querySelectorAll<HTMLElement>(selectors)).find(
        (element) => element.textContent?.includes(text)
      );
    };

    const assertTextIsPainted = (text: string) => {
      cy.document().then((doc) => {
        const element = findElementByText(doc, text);
        if (!element) {
          throw new Error(`Could not resolve element for text: ${text}`);
        }

        element.scrollIntoView({ block: "center", inline: "nearest" });
      });

      cy.wait(500);

      cy.document().then((doc) => {
        const element = findElementByText(doc, text);
        if (!element) {
          throw new Error(`Could not find visible text: ${text}`);
        }

        const win = element.ownerDocument.defaultView;
        expect(win, `window for "${text}"`).to.exist;

        const style = win!.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        expect(Number(style.opacity), `opacity for "${text}"`).to.be.greaterThan(0.05);
        expect(style.visibility, `visibility for "${text}"`).not.to.equal("hidden");
        expect(style.display, `display for "${text}"`).not.to.equal("none");
        expect(rect.width, `width for "${text}"`).to.be.greaterThan(0);
        expect(rect.height, `height for "${text}"`).to.be.greaterThan(0);
        expect(rect.bottom, `viewport bottom for "${text}"`).to.be.greaterThan(0);
        expect(rect.top, `viewport top for "${text}"`).to.be.lessThan(win!.innerHeight);
      });
    };

    checkedViewports.forEach((viewport) => {
      cy.log(`Checking ${viewport.name} viewport`);
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/en");
      cy.contains("Full-stack developer for products").should("be.visible");

      cy.document().then((doc) => {
        slowScrollTo(doc.documentElement.scrollHeight);
      });
      slowScrollTo(0);

      keyCopy.forEach((text) => {
        assertTextIsPainted(text);
      });
    });
  });
});
