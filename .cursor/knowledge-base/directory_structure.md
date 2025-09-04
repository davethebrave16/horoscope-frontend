# Current Directory Structure

## Project Structure

```
.
├── firebase.json
├── .firebaserc
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.js
├── env.example
├── README.md
└── **src/**
    ├── **components/**
    │   ├── **common/**
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── modal.tsx
    │   │   ├── error-message.tsx
    │   │   └── error-boundary.tsx
    │   ├── **layout/**
    │   │   ├── header.tsx
    │   │   └── footer.tsx
    │   └── **features/**
    │       ├── horoscope-form.tsx
    │       └── horoscope-results.tsx
    ├── **pages/**
    │   └── **Home/**
    │       └── home-page.tsx
    ├── **hooks/**
    │   ├── use-horoscope.ts
    │   ├── use-form.ts
    │   └── use-modal.ts
    ├── **services/**
    │   ├── **firebase/**
    │   │   └── config.ts
    │   └── **api/**
    │       ├── horoscope-api.ts
    │       └── geocoding-api.ts
    ├── **contexts/**
    │   └── app-context.tsx
    ├── **utils/**
    │   ├── index.ts
    │   └── validation.ts
    ├── **types/**
    │   └── index.ts
    ├── **constants/**
    │   └── index.ts
    ├── **styles/**
    │   └── (empty - using Tailwind)
    ├── App.tsx
    ├── App.css
    ├── index.tsx
    └── index.css
```
