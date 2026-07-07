const routes = [
  { name: "en-home", path: "/en" },
  { name: "en-projects", path: "/en/projects" },
  { name: "en-blog", path: "/en/blog" },
  { name: "en-project-focus-blocker", path: "/en/projects/Focus%20Blocker" },
  {
    name: "en-project-folder-structure",
    path: "/en/projects/Folder%20Structure%20V2",
  },
  { name: "en-project-thedimas-music", path: "/en/projects/Thedimas-Music" },
  { name: "en-project-planner", path: "/en/projects/Planner" },
  { name: "en-project-github-explorer", path: "/en/projects/Github-explorer" },
  { name: "en-blog-states", path: "/en/blog/states" },
  { name: "en-blog-story14", path: "/en/blog/story14" },
  { name: "ua-home", path: "/ua" },
  { name: "ua-projects", path: "/ua/projects" },
  { name: "ua-blog", path: "/ua/blog" },
  { name: "ua-project-focus-blocker", path: "/ua/projects/Focus%20Blocker" },
  {
    name: "ua-project-folder-structure",
    path: "/ua/projects/Folder%20Structure%20V2",
  },
  { name: "ua-project-thedimas-music", path: "/ua/projects/Thedimas-Music" },
  { name: "ua-project-planner", path: "/ua/projects/%D0%9F%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA" },
  { name: "ua-project-github-explorer", path: "/ua/projects/Github-explorer" },
  { name: "ua-blog-states", path: "/ua/blog/states" },
  { name: "ua-blog-story14", path: "/ua/blog/story14" },
];

const viewports = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
];

const freezeAnimations = () => {
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.setAttribute("data-cypress-visual-freeze", "true");
    style.innerHTML = `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }

      [style*="opacity:0"],
      [style*="opacity: 0"] {
        opacity: 1 !important;
        transform: none !important;
      }

      canvas {
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
  });
};

describe("visual snapshots", () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      it(`${route.name} ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit(route.path);
        freezeAnimations();
        cy.wait(500);
        cy.screenshot(`${route.name}-${viewport.name}`, {
          capture: "viewport",
          disableTimersAndAnimations: true,
          overwrite: true,
        });
      });
    }
  }
});
