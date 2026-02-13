---
applyTo: '**'
---
# Patterns (Architecture Canon)

Этот документ повторяет каноничные правила из `README.md` и предназначен для ежедневной разработки.

## Runtime env контракт

- Используется только `VITE_CASINO_NAME`.
- Базовая тема: `/variables.css`.
- Брендовый override: `/${VITE_CASINO_NAME}/variables.css`.
- `%VITE_PUBLIC_API_URL%` не используется.

## Слои

- `app` — bootstrapping, providers, router.
- `routes` — composition root.
- `features` — isolated user scenarios.
- `entities` — long-lived shared business state.
- `domain` — pure business logic and types.
- `shared` — infrastructure only.

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
- Deep import внутренних файлов чужого модуля
- Upward-импорты `../` в `shared`, `entities`, `features`, `routes`

## Public API

Каждый модуль предоставляет контракт через `index.ts`.

Разрешено:

- `$features/catalog/product-list`
- `$entities/cart`
- `$domain/product`
- `$shared/ui-kit`

Запрещено:

- `$features/catalog/product-list/product-list.view`
- `$domain/product/product.model`
- `$shared/ui-kit/file-label`

## Naming

- `.view.tsx` — UI
- `.model.ts` / `.reatom.ts` — логика и state
- `.types.ts` — типы
- `index.ts` — public API

## Проверка правилами

`bun run lint` обязан падать при:

- `features -> features`
- deep-import мимо `index.ts`
- upward-импортах `../` в критичных слоях
