# LLM Instructions (Canonical)

Этот файл синхронизирован с `README.md` и `PATTERNS.md`.

## Цель

Сохранять архитектуру как проверяемый контракт.

## Runtime env контракт

- Единственная runtime-переменная: `VITE_CASINO_NAME`.
- Базовая тема всегда грузится из `/variables.css`.
- Брендовая тема грузится из `/${VITE_CASINO_NAME}/variables.css` как override.
- `%VITE_PUBLIC_API_URL%` в проекте не используется.

## Слои

- `app`: запуск приложения, провайдеры, роутер, глобальные стили.
- `routes`: композиция feature по URL.
- `features`: пользовательские сценарии (изолированы друг от друга).
- `entities`: кросс-страничные сущности и shared state.
- `domain`: pure-функции, типы, доменные маппинги.
- `shared`: инфраструктура (`api`, `lib`, `types`, `ui-kit`, `reatom-context`).

## Dependency Rule

| From | Can import |
|---|---|
| `app` | `routes`, `features`, `entities`, `domain`, `shared` |
| `routes` | `features`, `entities`, `domain`, `shared` |
| `features` | `entities`, `domain`, `shared` |
| `entities` | `domain`, `shared` |
| `domain` | `domain`, внешние утилитарные зависимости |
| `shared` | `shared` |

Строго запрещено:

- `features -> features`
- `shared -> domain/entities/features/routes/app`
- `domain -> shared/entities/features/routes/app`
- Deep import внутренних файлов чужого модуля мимо `index.ts`
- Upward-импорты `../` в `shared`, `entities`, `features`, `routes`

## Public API

Используй публичные точки входа (`index.ts`):

- `$features/catalog/product-list`
- `$entities/cart`
- `$domain/product`
- `$shared/ui-kit`

Не используй:

- `$features/catalog/product-list/product-list.view`
- `$domain/product/product.types`
- `$shared/ui-kit/file-label`

## Reatom

- Разрешены `@reatom/core` и `@reatom/react`.
- Не использовать устаревшие `@reatom/framework` и `@reatom/npm-react`.

## Команды проверки

- `bun run lint`
- `bun run build`

Результат считается корректным только если все команды проходят.
