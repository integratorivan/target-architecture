# CLAUDE.md

Этот файл синхронизирован с `README.md`, `PATTERNS.md` и `LLM_INSTRUCTIONS.md`.

## Runtime env контракт

- Используется только `VITE_CASINO_NAME`.
- Базовые CSS-переменные: `/variables.css`.
- Брендовый override: `/${VITE_CASINO_NAME}/variables.css`.
- `%VITE_PUBLIC_API_URL%` не используется.

## Слои и роли

- `app` — bootstrap и провайдеры.
- `routes` — composition root.
- `features` — изолированные сценарии.
- `entities` — shared business state.
- `domain` — pure business logic.
- `shared` — инфраструктура.

## Dependency Rule

| From | Can import |
|---|---|
| `app` | `routes`, `features`, `entities`, `domain`, `shared` |
| `routes` | `features`, `entities`, `domain`, `shared` |
| `features` | `entities`, `domain`, `shared` |
| `entities` | `domain`, `shared` |
| `domain` | `domain`, внешние утилитарные зависимости |
| `shared` | `shared` |

Запрещено:

- `features -> features`
- `shared -> domain/entities/features/routes/app`
- `domain -> shared/entities/features/routes/app`
- Deep import мимо public API (`index.ts`)
- Upward-импорты `../` в `shared`, `entities`, `features`, `routes`

## Public API

Корректные импорты:

- `$features/catalog/product-list`
- `$entities/cart`
- `$domain/product`
- `$shared/ui-kit`

Некорректные импорты:

- `$features/catalog/product-list/product-list.view`
- `$domain/product/product.model`
- `$shared/ui-kit/file-label`

## Reatom

- Использовать `@reatom/core` и `@reatom/react`.
- Не использовать `@reatom/framework` и `@reatom/npm-react`.

## Команды

- `bun run dev`
- `bun run lint`
- `bun run build`
