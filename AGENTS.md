# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: app entry (`main.tsx`) and global styles.
- `src/routes`: TanStack Router tree (`__root.tsx`, route files, `routeTree.gen.ts`).
- `src/features`: feature slices; shared widgets live in `features/shared`, route-specific pieces under folders like `catalog/` with paired `.view.tsx` (UI) and `.model.ts` (logic) files. Example: `features/catalog/card-product/` for cart card UI.
- `src/shared`: cross-cutting layers — `lib/` for utilities/hooks, `domain/` for business models, `api/` for HTTP clients, `ui-kit/` for reusable atoms, `types/` for globals, `reatom-context/` for state setup.
- Path alias `$*` resolves to `src/*`; prefer over deep relative imports.

## Build, Test, and Development Commands
- Install: `bun install` (preferred, lockfile present) or `npm install`.
- Dev server: `bun run dev` starts Vite locally.
- Build: `bun run build`; preview prod bundle via `bun run preview`.
- Lint/format: `bun run lint` (ESLint + Prettier rules).

## Coding Style & Naming Conventions
- TypeScript + React 19; strict mode on. Avoid `any` (ESLint blocks it); favor function components.
- 4-space indent, semicolons kept, single quotes enforced. Kebab-case for files/folders; pair UI/logic with `.view.tsx` and `.model.ts` when applicable; domain shapes in `.types.ts`.
- Imports auto-sorted (`simple-import-sort`); interface/enum keys sorted; unused imports/vars flagged. Prefer named exports and small modules.

## Testing Guidelines
- Unit test infrastructure is intentionally removed from this template.

## Commit & Pull Request Guidelines
- Commit messages: short, imperative, optionally scoped (`catalog: add card product view`). Current history is minimal—set a clean precedent.
- PRs: explain intent/behavior changes, list commands run (lint/tests), link issues/tasks. Include screenshots/GIFs for UI changes and note env vars or migrations.

## Security & Configuration Tips
- Env: `VITE_CASINO_NAME` selects runtime CSS variables; document defaults and keep secrets out of VCS.
- API calls should live in `shared/api`; avoid ad-hoc endpoints inside views. Centralize constants in `shared/lib/constants` when adding new flags or regexes.
