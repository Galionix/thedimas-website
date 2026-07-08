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

  it("keeps homepage section copy visible after slow scrolling down and back up", () => {
    const keyCopy = [
      "Full-stack developer for products",
      "I build, repair and ship web products",
      "Quick contact",
      "Dmitry Galaktionov: full-stack",
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
