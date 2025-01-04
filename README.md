# Horse Racing Game

A real-time horse racing simulation game built with Vue 3 and TypeScript.

## Features

- Real-time horse racing simulation
- Dynamic race track animation
- Responsive design
- Race statistics and results
- Multiple horse selection

## Tech Stack

- Vue 3
- TypeScript
- Vuex (State Management)
- SCSS
- Vite

## Project Setup

```sh
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm run test:unit

# Run E2E tests (dev)
npm run test:e2e:dev

# Run E2E tests (production)
npm run test:e2e

# Lint files
npm run lint

# Format files
npm run format
```

## Project Structure

```
src/
├── assets/
│   ├── styles/
│   ├── icons/
│   └── logo.svg
├── components/
│   └── game/
│       ├── control/
│       ├── race/
│       └── horse/
├── constants/
├── store/
│   ├── modules/
│   └── index.ts
├── types/
├── utils/
├── views/
├── App.vue
├── main.ts
└── vuex.d.ts
```
