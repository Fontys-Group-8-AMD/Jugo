# Frontend (Jugo)

React + TypeScript + Vite frontend for dashboard upload and IBCS analysis result display.

## Prerequisites
- Node.js 18+
- Running backend API at `http://127.0.0.1:8000`

## Start Development Server

```powershell
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: start local dev server
- `npm run build`: build production bundle
- `npm run test`: run tests in watch mode
- `npm run test:run`: run all tests once
- `npm run test:coverage`: run tests with coverage

## API Contract Used by Frontend

The frontend expects `/predict` to return:
- overall: `prediction`, `label_name`, `score`
- probabilities: `probability_compliant`, `probability_non_compliant`
- per-rule list: `rules[]` for `AC`, `PY`, `PL`, `FC`

## Quick Validation

```powershell
npm run test:run
npm run build
```
