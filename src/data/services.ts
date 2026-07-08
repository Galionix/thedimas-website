export type Locale = "en" | "ua";

export type ServiceSlug =
  | "mvp-development"
  | "backend-development"
  | "admin-panels"
  | "technical-rescue";

export type Service = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
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
        title: "MVP Development with Next.js, Backend and Deployment | Dimas",
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
        title: "Backend Developer for APIs, Auth and Integrations | Dimas",
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
        title: "Admin Panel and Internal Tool Developer | Dimas",
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
        title: "Technical Rescue for Messy Web Projects | Dimas",
        description:
          "Technical rescue for unstable web products: codebase audit, blockers, tests, deployment fixes, integrations and release planning.",
        keywords:
          "technical rescue, codebase audit, fix messy web app, web project rescue, Next.js consultant",
      },
    },
  },
  ua: {
    "mvp-development": {
      slug: "mvp-development",
      eyebrow: "MVP та feature sprint",
      title: "MVP розробка для засновників, яким потрібен робочий продукт, а не презентація.",
      description:
        "Я перетворюю ідею на робочий Next.js/React застосунок з backend, базою даних, деплоєм і зрозумілим планом наступних кроків.",
      intro:
        "Це корисно, коли треба перевірити ідею, запустити першу платну версію, розблокувати команду або довести прототип до стану, де ним може користуватися реальна людина.",
      outcomes: [
        "Product scope перетворений на практичний build plan.",
        "Frontend, backend, database і deployment в одному workflow.",
        "Перша версія, яку можна показувати користувачам.",
        "Handoff notes, ризики та наступні пріоритети розробки.",
      ],
      process: [
        "Розібрати goal, user flow, data model та інтеграції.",
        "Зібрати найменшу корисну product surface з чистими межами.",
        "Задеплоїти, протестувати core flows і підтягнути narrative.",
        "Залишити реалістичний roadmap замість туманного backlog.",
      ],
      proof:
        "Релевантний досвід: production Next.js/Supabase платформа для Bella AI і менші MVP-style продукти, які я піднімав локально, тестував і документував.",
      faq: [
        {
          question: "Можна стартувати без повної специфікації?",
          answer:
            "Так. Я можу почати з сирої ідеї, нотаток з дзвінка або існуючого прототипу й перетворити це на scoped implementation plan.",
        },
        {
          question: "Який stack ти зазвичай використовуєш?",
          answer:
            "Найчастіше Next.js, React, TypeScript, API routes або Node services, PostgreSQL/Supabase, auth, deployment і automated checks.",
        },
        {
          question: "Можна почати маленько?",
          answer:
            "Так. Короткий audit або one-week sprint часто найкращий перший крок перед більшим engagement.",
        },
      ],
      seo: {
        title: "MVP розробка з Next.js, backend і deployment | Dimas",
        description:
          "Full-stack MVP розробка для founders: Next.js, React, backend APIs, database, deployment, tests і практичний launch plan.",
        keywords:
          "MVP developer, Next.js MVP development, full-stack MVP, React developer, startup MVP developer",
      },
    },
    "backend-development": {
      slug: "backend-development",
      eyebrow: "Backend та інтеграції",
      title: "Backend розробка для продуктів, яким потрібні надійні APIs, auth та інтеграції.",
      description:
        "Я проектую й будую API routes, data models, auth flows, webhooks, queues і third-party integrations, які можна підтримувати після першого релізу.",
      intro:
        "Це підходить командам, у яких вже є frontend, product surface або бізнес-процес, але backend став найкрихкішою частиною.",
      outcomes: [
        "API boundaries, які відповідають реальним product workflows.",
        "Data models і validation, які зменшують випадкову складність.",
        "Auth, permissions та integrations з явними правилами.",
        "Tests і operational notes для важливих flows.",
      ],
      process: [
        "Прочитати існуючий code, data model і production constraints.",
        "Визначити contracts, risks та migration path.",
        "Реалізувати backend slice з validation, error handling і logs.",
        "Перевірити critical paths і задокументувати extension points.",
      ],
      proof:
        "У Bella AI я працював з API routes, Supabase/PostgreSQL, RLS, role-based access, realtime flows, monitoring і frontend integration.",
      faq: [
        {
          question: "Можеш зайти в існуючий backend?",
          answer:
            "Так. Я починаю з карти contracts, database shape, deployment path і failure points.",
        },
        {
          question: "Ти працюєш тільки з Node.js?",
          answer:
            "Node/TypeScript найсильніше підходить для цього сайту, але я можу працювати і з суміжними web backend stacks, якщо product context зрозумілий.",
        },
        {
          question: "Можеш робити third-party APIs?",
          answer:
            "Так. Integrations, webhooks, auth providers, payment-style flows і external APIs це нормальна частина роботи.",
        },
      ],
      seo: {
        title: "Backend developer для APIs, auth та integrations | Dimas",
        description:
          "Backend розробка для web products: APIs, auth, data models, third-party integrations, webhooks, tests і deployment support.",
        keywords:
          "backend developer, API developer, Node.js backend, TypeScript backend, integrations developer",
      },
    },
    "admin-panels": {
      slug: "admin-panels",
      eyebrow: "Internal tools та admin panels",
      title: "Admin panel розробка для команд, які реально керують операціями в software.",
      description:
        "Я будую dashboards, role-based admin flows, tables, forms, reports і moderation interfaces, які допомагають маленьким командам рухатися швидше.",
      intro:
        "Internal tools швидко показують правду про продукт: permissions, edge cases, filtering, audit trails, exports, operational shortcuts і legacy data мають працювати разом.",
      outcomes: [
        "Admin screens, які відповідають реальній роботі команди.",
        "Role-based flows і permissions замість одного небезпечного panel.",
        "Корисні tables, forms, filters і status views.",
        "Maintainable frontend/backend path для майбутніх operations.",
      ],
      process: [
        "Розібрати roles, entities, daily workflows і risky actions.",
        "Спроєктувати щільні screens для scanning, editing і resolving.",
        "Зібрати UI, API і data validation разом.",
        "Протестувати repeated workflows і задокументувати assumptions.",
      ],
      proof:
        "Bella AI мала велику production admin surface для driving-school operations: students, attendance, assessments, tenant boundaries, role access і realtime kiosk flows.",
      faq: [
        {
          question: "Можеш зробити практично без дизайнера?",
          answer:
            "Так. Для operational tools я роблю UI щільним, передбачуваним і зручним для повторної роботи.",
        },
        {
          question: "Можеш працювати з messy data?",
          answer:
            "Так. Спочатку треба прояснити entities, ownership, permissions і flows, де помилки дорогі.",
        },
        {
          question: "Ти робиш frontend і backend?",
          answer:
            "Так. Admin panels найкраще працюють, коли UI, API, validation і data shape продумані разом.",
        },
      ],
      seo: {
        title: "Admin panel та internal tool developer | Dimas",
        description:
          "Admin panel та internal tool development: dashboards, role-based flows, tables, forms, reports, moderation і backend APIs.",
        keywords:
          "admin panel developer, internal tools developer, dashboard developer, operational software developer",
      },
    },
    "technical-rescue": {
      slug: "technical-rescue",
      eyebrow: "Technical rescue sprint",
      title: "Technical rescue для messy web projects, які знову мають shipping.",
      description:
        "Я заходжу в нестабільні codebases, маплю moving parts, фікшу blockers, додаю tests і роблю наступний release реалістичним.",
      intro:
        "Це для моменту, коли продукт все ще важливий, але code, deployment, integrations або team context стали занадто дорогими для руху вперед.",
      outcomes: [
        "Чітка карта того, що broken, risky і worth saving.",
        "Critical blockers fixed перед cosmetic refactors.",
        "Tests або monitoring навколо flows, які постійно ламаються.",
        "Practical release path і follow-up plan.",
      ],
      process: [
        "Audit repo, deployment, environment variables і user flows.",
        "Reproduce main failures і відсортувати їх за business impact.",
        "Fix smallest set of blockers, які unlock shipping.",
        "Document system, щоб наступна зміна була менш болючою.",
      ],
      proof:
        "Мій strongest fit: ownership від product problem до shipped software: frontend, backend, infrastructure, debugging, tests і handoff.",
      faq: [
        {
          question: "Ти переписуєш все з нуля?",
          answer:
            "Зазвичай ні. Rescue work починається з того, що має ship, і найменшого valuable path.",
        },
        {
          question: "Можеш працювати без документації?",
          answer:
            "Так. Я відновлюю карту з code, logs, deployment settings, user flows і current failure modes.",
        },
        {
          question: "Що дає перший sprint?",
          answer:
            "Short audit, fixed blockers where possible, release path і ranked list того, що ремонтувати далі.",
        },
      ],
      seo: {
        title: "Technical rescue для messy web projects | Dimas",
        description:
          "Technical rescue для нестабільних web products: codebase audit, blockers, tests, deployment fixes, integrations і release planning.",
        keywords:
          "technical rescue, codebase audit, fix messy web app, web project rescue, Next.js consultant",
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
