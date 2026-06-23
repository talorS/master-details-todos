# Master Details TODOs

A responsive React + TypeScript master-detail TODO app built with Vite. The app loads users from JSONPlaceholder, lets you select a user, view their TODOs, filter completed items through URL state, and optimistically toggle TODO completion.

## Features

- Master-detail layout for users and user TODOs
- URL-driven selected user route: `/users/:userId`
- URL-persisted TODO filter: `?hideCompleted=true`
- Runtime API validation with `io-ts`
- Server-state management with TanStack Query
- Optimistic TODO updates with rollback on failure
- Typed routes for safer domain modeling
- Responsive layout for desktop, tablet, and mobile
- Unit tests with Vitest and React Testing Library

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- fp-ts
- io-ts
- Vitest
- React Testing Library
- CSS Modules

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test -- --run
```

Run lint:

```bash
npm run lint
```

## Project Structure

```txt
src/
  api/          API-specific fetch functions
  components/   Reusable UI components
  config/       Routes and query client config
  dal/          Shared data access helpers
  hooks/        Data and UI-state hooks
  pages/        Route-level page components
  types/        io-ts codecs and branded domain types
  utils/        Shared utilities
```

## Notes

JSONPlaceholder accepts update requests but does not persist them. The app uses an optimistic update so toggling a TODO still feels immediate and realistic.

The selected user is persisted in the path, and the TODO filter is persisted in search params. This makes the UI refresh-friendly without adding local storage.
