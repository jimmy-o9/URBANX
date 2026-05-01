# URBANX

A modern React + TypeScript web application built with Vite.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Vitest + Testing Library
- ESLint

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint checks
- `npm run test` - run unit tests once
- `npm run test:watch` - run tests in watch mode

## CI/CD

GitHub Actions workflow is included at `.github/workflows/ci.yml`.
It runs lint, tests, and build on every push and pull request to `main`.

## Environment Variables

Create a local `.env` file for development. Do not commit secrets.
