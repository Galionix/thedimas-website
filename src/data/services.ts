export type Locale = "en" | "ua";

export type ServiceSlug =
  | "mvp-development"
  | "backend-development"
  | "admin-panels"
  | "technical-rescue"
  | "agency-partner"
  | "founder-mvp"
  | "internal-tools-automation"
  | "contract-full-stack-developer";

export type Service = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  audience?: string[];
  signals?: Array<{
    title: string;
    description: string;
  }>;
  outcomes: string[];
  process: string[];
  proof: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

export const serviceSlugs: ServiceSlug[] = [
  "mvp-development",
  "backend-development",
  "admin-panels",
  "technical-rescue",
  "agency-partner",
  "founder-mvp",
  "internal-tools-automation",
  "contract-full-stack-developer",
];

export const services: Record<Locale, Record<ServiceSlug, Service>> = {
  en: {
    "mvp-development": {
      slug: "mvp-development",
      eyebrow: "MVP and feature sprint",
      title: "MVP development for founders who need working software, not a pitch deck.",
      description:
        "I turn a product idea into a working Next.js/React application with backend, database, deployment and a clear next-step plan.",
      intro:
        "This is useful when you need to validate an idea, launch a first paid version, unblock a product team or turn a messy prototype into something a real user can touch.",
      outcomes: [
        "Product scope translated into a practical build plan.",
        "Frontend, backend, database and deployment owned in one workflow.",
        "A shippable first version with the boring production details handled.",
        "Clear handoff notes, risks and next development priorities.",
      ],
      process: [
        "Map the goal, user flow, data model and integrations.",
        "Build the smallest useful product surface with clean technical boundaries.",
        "Deploy, test core flows and tighten the product narrative.",
        "Leave you with a realistic roadmap instead of a vague backlog.",
      ],
      proof:
        "Relevant work includes production Next.js/Supabase platform development for Bella AI plus smaller MVP-style products that I brought up locally, tested and documented.",
      faq: [
        {
          question: "Can you work without a full specification?",
          answer:
            "Yes. I can start from a rough idea, call notes or an existing prototype and turn it into a scoped implementation plan.",
        },
        {
          question: "What stack do you usually use for MVPs?",
          answer:
            "Most often Next.js, React, TypeScript, API routes or Node services, PostgreSQL/Supabase, auth, deployment and automated checks.",
        },
        {
          question: "Can this start small?",
          answer:
            "Yes. A short audit or one-week build sprint is often the best first step before a larger engagement.",
        },
      ],
      seo: {
        title: "MVP Development with Next.js, Backend and Deployment | Dmitry Galaktionov",
        description:
          "Full-stack MVP development for founders: Next.js, React, backend APIs, database, deployment, tests and a practical launch plan.",
        keywords:
          "MVP developer, Next.js MVP development, full-stack MVP, React developer, startup MVP developer",
      },
    },
    "backend-development": {
      slug: "backend-development",
      eyebrow: "Backend and integrations",
      title: "Backend development for products that need reliable APIs, auth and integrations.",
      description:
        "I design and build API routes, data models, auth flows, webhooks, queues and third-party integrations that are understandable after the first release.",
      intro:
        "This fits teams that already have a frontend, a product surface or a business process, but need the backend to stop being the fragile part.",
      outcomes: [
        "API boundaries that match real product workflows.",
        "Data models and validation that reduce accidental complexity.",
        "Auth, permissions and service integration paths that are explicit.",
        "Tests and operational notes for the flows that matter.",
      ],
      process: [
        "Read the existing code, data model and production constraints.",
        "Define the contracts, risks and migration path.",
        "Implement the backend slice with validation, error handling and logs.",
        "Verify the critical paths and document how to extend them.",
      ],
      proof:
        "At Bella AI I worked across API routes, Supabase/PostgreSQL, RLS, role-based access, realtime flows, monitoring and frontend integration.",
      faq: [
        {
          question: "Can you join an existing backend?",
          answer:
            "Yes. I usually start by mapping the current contracts, database shape, deployment path and failure points.",
        },
        {
          question: "Do you only do Node.js?",
          answer:
            "Node/TypeScript is the strongest fit for this site, but I can work across adjacent web backend stacks when the product context is clear.",
        },
        {
          question: "Can you handle third-party APIs?",
          answer:
            "Yes. Integrations, webhooks, auth providers, payment-style flows and external APIs are a normal part of the work.",
        },
      ],
      seo: {
        title: "Backend Developer for APIs, Auth and Integrations | Dmitry Galaktionov",
        description:
          "Backend development for web products: APIs, auth, data models, third-party integrations, webhooks, tests and deployment support.",
        keywords:
          "backend developer, API developer, Node.js backend, TypeScript backend, integrations developer",
      },
    },
    "admin-panels": {
      slug: "admin-panels",
      eyebrow: "Internal tools and admin panels",
      title: "Admin panel development for teams that run real operations in software.",
      description:
        "I build dashboards, role-based admin flows, tables, forms, reports and moderation interfaces that help small teams move faster.",
      intro:
        "Internal tools are where product details get honest: permissions, edge cases, filtering, audit trails, exports, operational shortcuts and ugly legacy data all need to work.",
      outcomes: [
        "Admin screens that match the way the team actually works.",
        "Role-based flows and permissions instead of one giant unsafe panel.",
        "Useful tables, forms, filters and status views.",
        "A maintainable frontend and backend path for future operations.",
      ],
      process: [
        "Map roles, entities, daily workflows and risky actions.",
        "Design dense screens for scanning, editing and resolving work.",
        "Build the UI, API and data validation together.",
        "Test the repeated workflows and document operational assumptions.",
      ],
      proof:
        "Bella AI involved a large production admin surface for driving-school operations: students, attendance, assessments, tenant boundaries, role access and realtime kiosk flows.",
      faq: [
        {
          question: "Can you make it practical without a designer?",
          answer:
            "Yes. For operational tools I keep the UI dense, predictable and built for repeated use instead of marketing polish.",
        },
        {
          question: "Can you work with messy data?",
          answer:
            "Yes. The first step is usually clarifying entities, ownership, permissions and the few flows where mistakes are expensive.",
        },
        {
          question: "Do you build both frontend and backend?",
          answer:
            "Yes. Admin panels are strongest when UI, API, validation and data shape are designed together.",
        },
      ],
      seo: {
        title: "Admin Panel and Internal Tool Developer | Dmitry Galaktionov",
        description:
          "Admin panel and internal tool development: dashboards, role-based flows, tables, forms, reports, moderation and backend APIs.",
        keywords:
          "admin panel developer, internal tools developer, dashboard developer, operational software developer",
      },
    },
    "technical-rescue": {
      slug: "technical-rescue",
      eyebrow: "Technical rescue sprint",
      title: "Technical rescue for messy web projects that need to ship again.",
      description:
        "I enter unstable codebases, map the moving parts, fix blockers, add tests and make the next release realistic.",
      intro:
        "This is for the moment when the product still matters, but the code, deployment, integrations or team context became too expensive to move through.",
      outcomes: [
        "A clear map of what is broken, risky and worth saving.",
        "Critical blockers fixed before cosmetic refactors.",
        "Tests or monitoring added around the flows that keep breaking.",
        "A practical release path and follow-up plan.",
      ],
      process: [
        "Audit the repo, deployment, environment variables and user flows.",
        "Reproduce the main failures and rank them by business impact.",
        "Fix the smallest set of blockers that unlock shipping.",
        "Document the system so the next change is less painful.",
      ],
      proof:
        "My strongest fit is owning the path from product problem to shipped software: frontend, backend, infrastructure, debugging, tests and handoff.",
      faq: [
        {
          question: "Do you rewrite everything?",
          answer:
            "Usually no. Rescue work starts with understanding what must ship and fixing the smallest valuable path first.",
        },
        {
          question: "Can you work with missing documentation?",
          answer:
            "Yes. I rebuild the map from code, logs, deployment settings, user flows and the current failure modes.",
        },
        {
          question: "What does a first sprint produce?",
          answer:
            "A short audit, fixed blockers where possible, a release path, and a ranked list of what to repair next.",
        },
      ],
      seo: {
        title: "Technical Rescue for Messy Web Projects | Dmitry Galaktionov",
        description:
          "Technical rescue for unstable web products: codebase audit, blockers, tests, deployment fixes, integrations and release planning.",
        keywords:
          "technical rescue, codebase audit, fix messy web app, web project rescue, Next.js consultant",
      },
    },
    "agency-partner": {
      slug: "agency-partner",
      eyebrow: "Agency implementation partner",
      title: "A full-stack partner for agencies that need backend, admin and integration capacity.",
      description:
        "I help product, design and web studios deliver the technical parts behind client work: Next.js apps, APIs, admin panels, integrations, deployments and fixes.",
      intro:
        "This page is for agency founders and design partners who already sell product or web work, but sometimes need a senior developer who can quietly own the hard implementation slice without adding management overhead.",
      audience: [
        "Web or product studios with overflow backend/frontend work.",
        "Design partners who need reliable implementation after Figma.",
        "Agencies selling MVPs, SaaS dashboards, portals or internal tools.",
        "Teams that need a developer who can talk through scope directly and ship without babysitting.",
      ],
      signals: [
        {
          title: "Direct client ownership",
          description:
            "On Bella AI I worked directly with an English-speaking client, clarified requirements, broke down scope and managed delivery without a separate project manager.",
        },
        {
          title: "Backend plus product UI",
          description:
            "The strongest fit is not just landing pages: API routes, PostgreSQL/Supabase, RBAC, admin screens, realtime flows and practical product states.",
        },
        {
          title: "Production discipline",
          description:
            "I am comfortable adding Playwright tests, Sentry monitoring, deployment checks and handoff notes around the parts that matter.",
        },
      ],
      outcomes: [
        "A technical partner who can join behind your agency brand or work directly with the client when useful.",
        "Backend/API/admin work delivered with frontend context, not thrown over the wall.",
        "Fewer stuck projects when the design is ready but implementation needs product judgment.",
        "A realistic build scope, risks and next-step plan before the work turns expensive.",
      ],
      process: [
        "Review the client goal, current assets, deadline and risky parts.",
        "Define the smallest implementation slice that proves delivery.",
        "Build the UI/backend/data/integration path and keep scope visible.",
        "Ship, document and prepare the next phase or handoff.",
      ],
      proof:
        "Bella AI is the main commercial proof: a production Next.js/Supabase platform with multi-tenant admin, role-based access, realtime kiosk flows, API routes, migrations, tests and monitoring. Personal projects on the site are supporting signals, not the main selling point.",
      faq: [
        {
          question: "Can you work as a silent technical partner?",
          answer:
            "Yes. I can support agency delivery in the background, or communicate directly with the client if that is cleaner for scope and speed.",
        },
        {
          question: "What work is the best fit?",
          answer:
            "Next.js apps, backend APIs, admin panels, dashboards, integrations, auth, data models, deployments and technical rescue work.",
        },
        {
          question: "Can we start with a small task?",
          answer:
            "Yes. A scoped audit, one feature, one integration or one admin flow is usually the best way to test collaboration.",
        },
      ],
      seo: {
        title: "Full-Stack Development Partner for Agencies | Dmitry Galaktionov",
        description:
          "Full-stack implementation partner for agencies and design studios: Next.js, backend APIs, admin panels, integrations, deployment and technical rescue.",
        keywords:
          "agency development partner, white label developer, full-stack partner for agencies, Next.js agency developer, backend partner",
      },
    },
    "founder-mvp": {
      slug: "founder-mvp",
      eyebrow: "Founder MVP build",
      title: "A practical full-stack developer for founders who need the first serious product version.",
      description:
        "I help founders turn a product idea, messy prototype or half-built app into a working web product with backend, database, auth, deployment and a realistic release path.",
      intro:
        "This is for founders who do not need a huge team yet, but do need one person who can understand the product problem, make technical decisions and get something real in front of users.",
      audience: [
        "Founders validating a SaaS, marketplace, portal or workflow product.",
        "Teams with a prototype that is too fragile for real users.",
        "Products that need auth, payments-ready architecture, admin views or integrations.",
        "Early teams that want one accountable full-stack owner before hiring a larger team.",
      ],
      signals: [
        {
          title: "Product-to-code ownership",
          description:
            "I can move from unclear requirements to database shape, API contracts, UI flows, deployment and a ranked next-step plan.",
        },
        {
          title: "Commercial product context",
          description:
            "Bella AI involved student management flows, assessments, attendance, multi-tenant admin and role-aware access rather than a decorative prototype.",
        },
        {
          title: "Honest scope control",
          description:
            "If a project needs documents, payment-provider setup or business decisions before implementation, I call that out early instead of pretending code alone solves it.",
        },
      ],
      outcomes: [
        "A scoped MVP or feature sprint that can be shown to users.",
        "Frontend, backend, database, auth and deployment connected in one product path.",
        "Important edge cases surfaced before they become expensive.",
        "Clear technical notes for the next developer, investor demo or product phase.",
      ],
      process: [
        "Clarify the user, painful workflow, must-have feature and deadline.",
        "Map the data model, auth, roles, integrations and deployment constraints.",
        "Build the smallest useful version and test the critical flows.",
        "Leave a practical roadmap for the next release.",
      ],
      proof:
        "Bella AI shows the commercial pattern: Next.js, TypeScript, Supabase/PostgreSQL, RBAC, RLS migrations, realtime flows, Playwright tests, Sentry and PostHog in a real operational product.",
      faq: [
        {
          question: "Can you work from a rough idea?",
          answer:
            "Yes. The first useful deliverable can be a short product/technical map before writing a lot of code.",
        },
        {
          question: "Can you help with payments?",
          answer:
            "Yes, once the business account, provider documents and compliance requirements are ready. I will not hide those dependencies.",
        },
        {
          question: "Do you build investor-demo projects?",
          answer:
            "Yes, but I prefer demos that are close enough to the real product path so the work is not thrown away.",
        },
      ],
      seo: {
        title: "Full-Stack MVP Developer for Founders | Dmitry Galaktionov",
        description:
          "Founder-focused MVP development with Next.js, React, TypeScript, backend APIs, Supabase/PostgreSQL, auth, admin views, deployment and tests.",
        keywords:
          "MVP developer for founders, startup full-stack developer, SaaS MVP developer, Next.js startup developer, product engineer",
      },
    },
    "internal-tools-automation": {
      slug: "internal-tools-automation",
      eyebrow: "Internal tools and automation",
      title: "Internal tools, admin panels and integrations for teams with messy operations.",
      description:
        "I build the operational software behind small teams: dashboards, admin flows, role-based access, imports, reports, automations and third-party integrations.",
      intro:
        "This page is for product and operations people who feel the team is losing time in spreadsheets, manual status checks, fragile scripts or admin screens that do not match the real workflow.",
      audience: [
        "Product/ops teams replacing spreadsheets with real workflows.",
        "Small companies that need dashboards, admin panels or role-based tools.",
        "Teams with repeated manual work across email, forms, CRMs, APIs or databases.",
        "Businesses that need practical automation with human approval where mistakes are costly.",
      ],
      signals: [
        {
          title: "Operations-heavy product work",
          description:
            "Bella AI was built around real operational flows: students, attendance, assessments, tenant boundaries, role access and realtime kiosk check-in/out.",
        },
        {
          title: "Permissions matter",
          description:
            "I have worked with RBAC, Supabase Row-Level Security, invitation-based registration and role-aware UI/API paths.",
        },
        {
          title: "Useful density",
          description:
            "For internal tools I prefer dense, predictable screens for scanning and repeated work instead of decorative marketing UI.",
        },
      ],
      outcomes: [
        "Operational screens that match how the team actually works.",
        "Role-aware access and safer flows for risky actions.",
        "Automations and integrations that reduce manual status work.",
        "A maintainable path for future reporting, imports, exports and admin changes.",
      ],
      process: [
        "Map roles, entities, states, repeated actions and failure costs.",
        "Pick one workflow where software will remove real friction.",
        "Build the UI, API, data validation and permissions together.",
        "Test the repeated path and document operational assumptions.",
      ],
      proof:
        "The Bella AI case is especially relevant here: multi-tenant admin, attendance, assessments, photo capture, role-based access, realtime kiosk flows, monitoring and E2E tests.",
      faq: [
        {
          question: "Can you automate a messy process without rebuilding the whole company?",
          answer:
            "Yes. The safest start is one workflow, one source of truth and a clear manual fallback.",
        },
        {
          question: "Can you connect existing tools?",
          answer:
            "Yes. APIs, webhooks, auth providers, databases, CRMs and custom dashboards are all normal parts of this work.",
        },
        {
          question: "Can you make it usable without a designer?",
          answer:
            "Yes. Operational UI should be clear, dense and predictable. It does not need to look like a landing page.",
        },
      ],
      seo: {
        title: "Internal Tools and Automation Developer | Dmitry Galaktionov",
        description:
          "Internal tools, admin panels and automation development: dashboards, RBAC, integrations, reports, workflows, APIs and operational software.",
        keywords:
          "internal tools developer, automation developer, admin panel developer, operations software developer, workflow automation",
      },
    },
    "contract-full-stack-developer": {
      slug: "contract-full-stack-developer",
      eyebrow: "Contract full-stack developer",
      title: "Senior full-stack developer available for remote contract work.",
      description:
        "I work across React, Next.js, TypeScript, backend APIs, databases, integrations and infrastructure cleanup for teams that need an experienced contributor quickly.",
      intro:
        "This page is for recruiters, hiring managers and engineering leads who need a practical developer for contract, remote or hybrid product work without spending weeks decoding a vague profile.",
      audience: [
        "Recruiters sourcing React, Next.js, TypeScript or Node.js engineers.",
        "Teams needing a senior developer for a focused contract period.",
        "Products with frontend, backend and infrastructure work mixed together.",
        "Engineering leads who need someone comfortable in messy existing systems.",
      ],
      signals: [
        {
          title: "Wide delivery range",
          description:
            "Frontend, backend, infrastructure, tests, monitoring, deployments and integrations are all within the same working range.",
        },
        {
          title: "Recent commercial stack",
          description:
            "Bella AI used Next.js, React, TypeScript, Supabase/PostgreSQL, Zod, RTK Query, Playwright, Sentry, PostHog and Vercel.",
        },
        {
          title: "Remote-friendly communication",
          description:
            "I can clarify requirements, name risks, decompose work and keep delivery tied to product value without needing heavy process.",
        },
      ],
      outcomes: [
        "A developer who can contribute across frontend/backend boundaries.",
        "Less handoff friction on features involving API, UI, data and deployment together.",
        "Faster stabilization of messy flows, tests and release blockers.",
        "Clear written notes for async teams.",
      ],
      process: [
        "Review role context, stack, team expectations and contract shape.",
        "Map the first useful contribution and any onboarding risks.",
        "Start with a focused implementation or stabilization task.",
        "Turn the first delivery into a practical ongoing plan if the fit is good.",
      ],
      proof:
        "Commercial proof includes Bella AI production platform work plus portfolio samples that show product UI states, local testing, Cypress/Playwright coverage and delivery documentation.",
      faq: [
        {
          question: "What roles are the best fit?",
          answer:
            "Full-stack, frontend-heavy full-stack, backend/API, internal tools, admin panels, integrations and technical rescue roles.",
        },
        {
          question: "Are you open to remote work?",
          answer:
            "Yes. Remote contract work is a strong fit. Hybrid/on-site can be discussed when location and project context make sense.",
        },
        {
          question: "What is the fastest way to evaluate fit?",
          answer:
            "Send the stack, product context, contract length, timezone expectations and the first problem you need solved.",
        },
      ],
      seo: {
        title: "Contract Full-Stack Developer | React, Next.js, TypeScript | Dmitry Galaktionov",
        description:
          "Senior full-stack developer available for remote contract work: React, Next.js, TypeScript, Node.js, APIs, Supabase/PostgreSQL, integrations and infrastructure.",
        keywords:
          "contract full-stack developer, remote React developer, Next.js contractor, TypeScript developer, Node.js contractor",
      },
    },
  },
  ua: {
    "mvp-development": {
      slug: "mvp-development",
      eyebrow: "MVP та функціональні спринти",
      title: "MVP розробка для засновників, яким потрібен робочий продукт, а не презентація.",
      description:
        "Я перетворюю ідею на робочий Next.js/React застосунок з backend, базою даних, деплоєм і зрозумілим планом наступних кроків.",
      intro:
        "Це корисно, коли треба перевірити ідею, запустити першу платну версію, розблокувати команду або довести прототип до стану, де ним може користуватися реальна людина.",
      outcomes: [
        "Обсяг продукту перетворений на практичний план розробки.",
        "Frontend, backend, база даних і деплой в одному робочому процесі.",
        "Перша версія, яку можна показувати користувачам.",
        "Нотатки для передачі, ризики та наступні пріоритети розробки.",
      ],
      process: [
        "Розібрати ціль, користувацький сценарій, модель даних та інтеграції.",
        "Зібрати найменшу корисну частину продукту з чистими технічними межами.",
        "Задеплоїти, протестувати основні сценарії і привести подачу продукту до ладу.",
        "Залишити реалістичну дорожню карту замість туманного списку задач.",
      ],
      proof:
        "Релевантний досвід: production Next.js/Supabase платформа для Bella AI і менші MVP-продукти, які я піднімав локально, тестував і документував.",
      faq: [
        {
          question: "Можна стартувати без повної специфікації?",
          answer:
            "Так. Я можу почати з сирої ідеї, нотаток з дзвінка або існуючого прототипу й перетворити це на обмежений план реалізації.",
        },
        {
          question: "Який stack ти зазвичай використовуєш?",
          answer:
            "Найчастіше Next.js, React, TypeScript, API routes або Node-сервіси, PostgreSQL/Supabase, auth, deployment і автоматизовані перевірки.",
        },
        {
          question: "Можна почати маленько?",
          answer:
            "Так. Короткий аудит або тижневий спринт часто є найкращим першим кроком перед більшою співпрацею.",
        },
      ],
      seo: {
        title: "MVP розробка з Next.js, backend і deployment | Dmitry Galaktionov",
        description:
          "Full-stack MVP розробка для засновників: Next.js, React, backend APIs, база даних, деплой, тести і практичний план запуску.",
        keywords:
          "MVP developer, Next.js MVP development, full-stack MVP, React developer, startup MVP developer",
      },
    },
    "backend-development": {
      slug: "backend-development",
      eyebrow: "Backend та інтеграції",
      title: "Backend розробка для продуктів, яким потрібні надійні API, auth та інтеграції.",
      description:
        "Я проектую й будую API routes, моделі даних, auth flows, webhooks, queues і сторонні інтеграції, які можна підтримувати після першого релізу.",
      intro:
        "Це підходить командам, у яких вже є frontend, продуктова поверхня або бізнес-процес, але backend став найкрихкішою частиною.",
      outcomes: [
        "Межі API, які відповідають реальним продуктовим сценаріям.",
        "Моделі даних і валідація, які зменшують випадкову складність.",
        "Auth, permissions та інтеграції з явними правилами.",
        "Тести й операційні нотатки для важливих сценаріїв.",
      ],
      process: [
        "Прочитати існуючий код, модель даних і production-обмеження.",
        "Визначити контракти, ризики та шлях міграції.",
        "Реалізувати backend-частину з валідацією, error handling і логами.",
        "Перевірити критичні сценарії і задокументувати точки розширення.",
      ],
      proof:
        "У Bella AI я працював з API routes, Supabase/PostgreSQL, RLS, рольовим доступом, realtime flows, моніторингом і frontend-інтеграцією.",
      faq: [
        {
          question: "Можеш зайти в існуючий backend?",
          answer:
            "Так. Я починаю з карти контрактів, структури бази даних, deployment path і точок відмови.",
        },
        {
          question: "Ти працюєш тільки з Node.js?",
          answer:
            "Node/TypeScript тут найсильніший варіант, але я можу працювати і з суміжними web backend stacks, якщо продуктовий контекст зрозумілий.",
        },
        {
          question: "Можеш робити third-party APIs?",
          answer:
            "Так. Інтеграції, webhooks, auth providers, payment-style flows і зовнішні API — це нормальна частина роботи.",
        },
      ],
      seo: {
        title: "Backend developer для APIs, auth та integrations | Dmitry Galaktionov",
        description:
          "Backend розробка для web products: API, auth, моделі даних, сторонні інтеграції, webhooks, тести і deployment support.",
        keywords:
          "backend developer, API developer, Node.js backend, TypeScript backend, integrations developer",
      },
    },
    "admin-panels": {
      slug: "admin-panels",
      eyebrow: "Внутрішні інструменти та адмінки",
      title: "Розробка адмінок для команд, які реально керують операціями в софті.",
      description:
        "Я будую dashboards, рольові admin flows, таблиці, форми, звіти й moderation interfaces, які допомагають маленьким командам рухатися швидше.",
      intro:
        "Внутрішні інструменти швидко показують правду про продукт: permissions, edge cases, filtering, audit trails, exports, operational shortcuts і legacy data мають працювати разом.",
      outcomes: [
        "Адмін-екрани, які відповідають реальній роботі команди.",
        "Рольові сценарії і permissions замість однієї небезпечної панелі.",
        "Корисні таблиці, форми, фільтри й статусні екрани.",
        "Підтримуваний frontend/backend шлях для майбутніх операцій.",
      ],
      process: [
        "Розібрати ролі, сутності, щоденні сценарії і ризиковані дії.",
        "Спроєктувати щільні екрани для перегляду, редагування і розвʼязання задач.",
        "Зібрати UI, API і валідацію даних разом.",
        "Протестувати повторювані сценарії і задокументувати припущення.",
      ],
      proof:
        "Bella AI мала велику production адмінку для процесів driving school: студенти, відвідуваність, оцінювання, tenant boundaries, рольовий доступ і realtime kiosk flows.",
      faq: [
        {
          question: "Можеш зробити практично без дизайнера?",
          answer:
            "Так. Для operational tools я роблю UI щільним, передбачуваним і зручним для повторної роботи.",
        },
        {
          question: "Можеш працювати з messy data?",
          answer:
            "Так. Спочатку треба прояснити сутності, ownership, permissions і сценарії, де помилки дорогі.",
        },
        {
          question: "Ти робиш frontend і backend?",
          answer:
            "Так. Адмінки найкраще працюють, коли UI, API, валідація і структура даних продумані разом.",
        },
      ],
      seo: {
        title: "Admin panel та internal tool developer | Dmitry Galaktionov",
        description:
          "Розробка адмінок і internal tools: dashboards, рольові сценарії, таблиці, форми, звіти, moderation і backend APIs.",
        keywords:
          "admin panel developer, internal tools developer, dashboard developer, operational software developer",
      },
    },
    "technical-rescue": {
      slug: "technical-rescue",
      eyebrow: "Technical rescue спринт",
      title: "Technical rescue для заплутаних web projects, які знову мають почати shipping.",
      description:
        "Я заходжу в нестабільні codebases, розбираю moving parts, прибираю blockers, додаю tests і роблю наступний release реалістичним.",
      intro:
        "Це для моменту, коли продукт все ще важливий, але код, деплой, інтеграції або командний контекст стали занадто дорогими для руху вперед.",
      outcomes: [
        "Чітка карта того, що зламано, ризиковано і варто зберігати.",
        "Критичні blockers виправлені до косметичних refactors.",
        "Тести або monitoring навколо сценаріїв, які постійно ламаються.",
        "Практичний шлях до релізу і план наступних кроків.",
      ],
      process: [
        "Аудит репозиторію, деплою, environment variables і користувацьких сценаріїв.",
        "Відтворити головні збої і відсортувати їх за впливом на бізнес.",
        "Виправити найменший набір blockers, який розблокує shipping.",
        "Задокументувати систему, щоб наступна зміна була менш болючою.",
      ],
      proof:
        "Мій найсильніший формат: ownership від product problem до shipped software: frontend, backend, infrastructure, debugging, tests і handoff.",
      faq: [
        {
          question: "Ти переписуєш все з нуля?",
          answer:
            "Зазвичай ні. Rescue work починається з того, що має бути shipped, і з найменшого цінного шляху.",
        },
        {
          question: "Можеш працювати без документації?",
          answer:
            "Так. Я відновлюю карту з коду, логів, deployment settings, user flows і поточних failure modes.",
        },
        {
          question: "Що дає перший sprint?",
          answer:
            "Короткий аудит, виправлені blockers де це можливо, release path і пріоритетний список наступних ремонтів.",
        },
      ],
      seo: {
        title: "Technical rescue для messy web projects | Dmitry Galaktionov",
        description:
          "Technical rescue для нестабільних web products: codebase audit, blockers, tests, deployment fixes, integrations і release planning.",
        keywords:
          "technical rescue, codebase audit, fix messy web app, web project rescue, Next.js consultant",
      },
    },
    "agency-partner": {
      slug: "agency-partner",
      eyebrow: "Партнер для agency delivery",
      title: "Full-stack партнер для агенцій, яким потрібен backend, адмінки та інтеграції.",
      description:
        "Я допомагаю product, design і web studios закривати технічну частину client work: Next.js apps, API, адмінки, інтеграції, деплої і fixes.",
      intro:
        "Ця сторінка для agency founders і design partners, які вже продають product або web work, але іноді потребують senior developer, що спокійно візьме складну implementation частину без зайвого менеджменту.",
      audience: [
        "Web або product studios з overflow backend/frontend роботою.",
        "Design partners, яким потрібна надійна реалізація після Figma.",
        "Агенції, які продають MVP, SaaS dashboards, portals або internal tools.",
        "Команди, яким потрібен developer, що може прямо обговорювати scope і ship без babysitting.",
      ],
      signals: [
        {
          title: "Пряма робота з клієнтом",
          description:
            "У Bella AI я працював напряму з англомовним замовником, уточнював requirements, декомпозував scope і тримав delivery без окремого project manager.",
        },
        {
          title: "Backend плюс продуктовий UI",
          description:
            "Найсильніший fit — не просто landing pages: API routes, PostgreSQL/Supabase, RBAC, admin screens, realtime flows і практичні product states.",
        },
        {
          title: "Production discipline",
          description:
            "Можу додавати Playwright tests, Sentry monitoring, deployment checks і handoff notes навколо важливих flows.",
        },
      ],
      outcomes: [
        "Technical partner, який може працювати за брендом агенції або напряму з клієнтом, якщо так швидше.",
        "Backend/API/admin work з frontend context, а не ізольований шматок.",
        "Менше stuck projects, коли дизайн готовий, але implementation потребує product judgment.",
        "Реалістичний build scope, risks і next-step plan до того, як робота стане дорогою.",
      ],
      process: [
        "Переглянути client goal, assets, deadline і ризикові частини.",
        "Визначити найменший implementation slice, який доведе delivery.",
        "Зібрати UI/backend/data/integration path і тримати scope видимим.",
        "Ship, документація і підготовка next phase або handoff.",
      ],
      proof:
        "Bella AI — головний commercial proof: production Next.js/Supabase platform з multi-tenant admin, role-based access, realtime kiosk flows, API routes, migrations, tests і monitoring. Personal projects на сайті — supporting signals, не головна ставка.",
      faq: [
        {
          question: "Можеш працювати як silent technical partner?",
          answer:
            "Так. Можу підтримувати agency delivery у фоні або говорити напряму з клієнтом, якщо це краще для scope і speed.",
        },
        {
          question: "Яка робота найкраще підходить?",
          answer:
            "Next.js apps, backend APIs, admin panels, dashboards, integrations, auth, data models, deployments і technical rescue work.",
        },
        {
          question: "Можна почати з маленької задачі?",
          answer:
            "Так. Scoped audit, one feature, one integration або one admin flow — хороший спосіб перевірити співпрацю.",
        },
      ],
      seo: {
        title: "Full-stack development partner для агенцій | Dmitry Galaktionov",
        description:
          "Full-stack implementation partner для agencies і design studios: Next.js, backend APIs, admin panels, integrations, deployment і technical rescue.",
        keywords:
          "agency development partner, white label developer, full-stack partner for agencies, Next.js agency developer, backend partner",
      },
    },
    "founder-mvp": {
      slug: "founder-mvp",
      eyebrow: "MVP для засновників",
      title: "Практичний full-stack developer для засновників, яким потрібна перша серйозна версія продукту.",
      description:
        "Я допомагаю засновникам перетворити ідею, messy prototype або half-built app на working web product з backend, базою даних, auth, deployment і реалістичним release path.",
      intro:
        "Це для засновників, яким ще не потрібна велика команда, але потрібна одна людина, що зрозуміє product problem, прийме технічні рішення і доведе щось реальне до користувачів.",
      audience: [
        "Засновники, які валідують SaaS, marketplace, portal або workflow product.",
        "Команди з prototype, який занадто fragile для реальних користувачів.",
        "Products, яким потрібні auth, payments-ready architecture, admin views або integrations.",
        "Early teams, яким потрібен accountable full-stack owner перед наймом більшої команди.",
      ],
      signals: [
        {
          title: "Ownership від продукту до коду",
          description:
            "Можу пройти шлях від нечітких requirements до database shape, API contracts, UI flows, deployment і ranked next-step plan.",
        },
        {
          title: "Комерційний продуктовий контекст",
          description:
            "Bella AI включала student management flows, assessments, attendance, multi-tenant admin і role-aware access, а не декоративний prototype.",
        },
        {
          title: "Чесний контроль scope",
          description:
            "Якщо project потребує documents, payment-provider setup або business decisions до implementation, я кажу це рано, а не вдаю, що код сам все вирішить.",
        },
      ],
      outcomes: [
        "Обмежений MVP або feature sprint, який можна показувати користувачам.",
        "Frontend, backend, база даних, auth і deployment в одному product path.",
        "Важливі edge cases знайдені до того, як стануть дорогими.",
        "Зрозумілі технічні нотатки для наступного developer, investor demo або product phase.",
      ],
      process: [
        "Уточнити користувача, болючий workflow, must-have feature і deadline.",
        "Замапити data model, auth, roles, integrations і deployment constraints.",
        "Зібрати найменшу корисну версію і протестувати critical flows.",
        "Залишити практичну дорожню карту для наступного release.",
      ],
      proof:
        "Bella AI показує commercial pattern: Next.js, TypeScript, Supabase/PostgreSQL, RBAC, RLS migrations, realtime flows, Playwright tests, Sentry і PostHog в реальному operational product.",
      faq: [
        {
          question: "Можеш працювати з сирої ідеї?",
          answer:
            "Так. Першим корисним результатом може бути коротка продуктово-технічна карта ще до великого коду.",
        },
        {
          question: "Можеш допомогти з payments?",
          answer:
            "Так, коли business account, provider documents і compliance requirements готові. Я не приховую такі dependencies.",
        },
        {
          question: "Робиш investor-demo projects?",
          answer:
            "Так, але я віддаю перевагу demos, які близькі до real product path, щоб роботу не довелося викидати.",
        },
      ],
      seo: {
        title: "Full-stack MVP developer для founders | Dmitry Galaktionov",
        description:
          "MVP development для засновників з Next.js, React, TypeScript, backend APIs, Supabase/PostgreSQL, auth, admin views, deployment і tests.",
        keywords:
          "MVP developer for founders, startup full-stack developer, SaaS MVP developer, Next.js startup developer, product engineer",
      },
    },
    "internal-tools-automation": {
      slug: "internal-tools-automation",
      eyebrow: "Internal tools та automation",
      title: "Internal tools, admin panels та integrations для команд із заплутаними операціями.",
      description:
        "Я будую operational software для small teams: dashboards, admin flows, role-based access, imports, reports, automations і third-party integrations.",
      intro:
        "Ця сторінка для product і operations людей, які відчувають, що команда втрачає час у spreadsheets, ручних status checks, fragile scripts або admin screens, які не відповідають реальному workflow.",
      audience: [
        "Product/ops teams, які замінюють spreadsheets реальними workflows.",
        "Small companies, яким потрібні dashboards, admin panels або role-based tools.",
        "Команди з повторюваною ручною роботою через email, forms, CRMs, APIs або databases.",
        "Businesses, яким потрібна practical automation з human approval там, де помилки дорогі.",
      ],
      signals: [
        {
          title: "Product work навколо операцій",
          description:
            "Bella AI будувалась навколо real operational flows: students, attendance, assessments, tenant boundaries, role access і realtime kiosk check-in/out.",
        },
        {
          title: "Permissions matter",
          description:
            "Я працював з RBAC, Supabase Row-Level Security, invitation-based registration і role-aware UI/API paths.",
        },
        {
          title: "Корисна щільність",
          description:
            "Для internal tools я обираю щільні, передбачувані screens для scanning і repeated work замість decorative marketing UI.",
        },
      ],
      outcomes: [
        "Operational screens, які відповідають реальній роботі команди.",
        "Role-aware access і safer flows для risky actions.",
        "Automations та integrations, які зменшують ручну status work.",
        "Maintainable path для future reporting, imports, exports і admin changes.",
      ],
      process: [
        "Замапити roles, entities, states, repeated actions і failure costs.",
        "Обрати один workflow, де software прибере real friction.",
        "Зібрати UI, API, data validation і permissions разом.",
        "Протестувати repeated path і задокументувати operational assumptions.",
      ],
      proof:
        "Bella AI case особливо релевантний тут: multi-tenant admin, attendance, assessments, photo capture, role-based access, realtime kiosk flows, monitoring і E2E tests.",
      faq: [
        {
          question: "Можеш автоматизувати messy process без перебудови всієї компанії?",
          answer:
            "Так. Найбезпечніший старт — один workflow, one source of truth і clear manual fallback.",
        },
        {
          question: "Можеш підключати існуючі tools?",
          answer:
            "Так. APIs, webhooks, auth providers, databases, CRMs і custom dashboards — нормальна частина цієї роботи.",
        },
        {
          question: "Можеш зробити usable без дизайнера?",
          answer:
            "Так. Operational UI має бути clear, dense і predictable. Він не має виглядати як landing page.",
        },
      ],
      seo: {
        title: "Internal tools та automation developer | Dmitry Galaktionov",
        description:
          "Internal tools, admin panels та automation development: dashboards, RBAC, integrations, reports, workflows, APIs і operational software.",
        keywords:
          "internal tools developer, automation developer, admin panel developer, operations software developer, workflow automation",
      },
    },
    "contract-full-stack-developer": {
      slug: "contract-full-stack-developer",
      eyebrow: "Contract full-stack developer",
      title: "Senior full-stack developer для remote contract work.",
      description:
        "Я працюю з React, Next.js, TypeScript, backend APIs, базами даних, integrations і infrastructure cleanup для команд, яким швидко потрібен experienced contributor.",
      intro:
        "Ця сторінка для recruiters, hiring managers і engineering leads, яким потрібен practical developer для contract, remote або hybrid product work без тижнів розшифровки vague profile.",
      audience: [
        "Recruiters, які шукають React, Next.js, TypeScript або Node.js engineers.",
        "Команди, яким потрібен senior developer на focused contract period.",
        "Products, де frontend, backend і infrastructure work змішані разом.",
        "Engineering leads, яким потрібна людина, що нормально заходить у messy existing systems.",
      ],
      signals: [
        {
          title: "Широкий delivery range",
          description:
            "Frontend, backend, infrastructure, tests, monitoring, deployments і integrations — все в одному working range.",
        },
        {
          title: "Актуальний commercial stack",
          description:
            "Bella AI використовувала Next.js, React, TypeScript, Supabase/PostgreSQL, Zod, RTK Query, Playwright, Sentry, PostHog і Vercel.",
        },
        {
          title: "Remote-friendly communication",
          description:
            "Можу уточнювати requirements, називати risks, декомпозувати work і тримати delivery привʼязаним до product value без heavy process.",
        },
      ],
      outcomes: [
        "Developer, який може працювати через frontend/backend boundaries.",
        "Менше handoff friction на features, де API, UI, data і deployment повʼязані.",
        "Швидша стабілізація messy flows, tests і release blockers.",
        "Зрозумілі письмові нотатки для async teams.",
      ],
      process: [
        "Переглянути role context, stack, team expectations і contract shape.",
        "Замапити first useful contribution і onboarding risks.",
        "Почати з focused implementation або stabilization task.",
        "Перетворити першу delivery на practical ongoing plan, якщо fit хороший.",
      ],
      proof:
        "Commercial proof: Bella AI production platform work плюс portfolio samples, які показують product UI states, local testing, Cypress/Playwright coverage і delivery documentation.",
      faq: [
        {
          question: "Які roles найкраще підходять?",
          answer:
            "Full-stack, frontend-heavy full-stack, backend/API, internal tools, admin panels, integrations і technical rescue roles.",
        },
        {
          question: "Ти відкритий до remote work?",
          answer:
            "Так. Remote contract work — сильний fit. Hybrid/on-site можна обговорювати, якщо location і project context мають сенс.",
        },
        {
          question: "Як найшвидше перевірити fit?",
          answer:
            "Надішліть stack, product context, contract length, timezone expectations і першу problem, яку треба вирішити.",
        },
      ],
      seo: {
        title: "Contract full-stack developer | React, Next.js, TypeScript | Dmitry Galaktionov",
        description:
          "Senior full-stack developer для remote contract work: React, Next.js, TypeScript, Node.js, APIs, Supabase/PostgreSQL, integrations і infrastructure.",
        keywords:
          "contract full-stack developer, remote React developer, Next.js contractor, TypeScript developer, Node.js contractor",
      },
    },
  },
};

export const getService = (locale: string | undefined, slug: string | undefined) => {
  const safeLocale: Locale = locale === "en" ? "en" : "ua";

  if (!slug || !serviceSlugs.includes(slug as ServiceSlug)) {
    return null;
  }

  return services[safeLocale][slug as ServiceSlug];
};
