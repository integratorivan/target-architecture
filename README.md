# Frontend Architecture Canon

Этот репозиторий фиксирует архитектуру как проверяемый контракт, а не как набор договоренностей.

## Runtime env контракт

Поддерживается только одна runtime переменная фронта:

- `VITE_CASINO_NAME`

Что происходит при старте приложения:

1. Всегда подключается базовый fallback `/variables.css`.
2. Если задан `VITE_CASINO_NAME`, дополнительно подключается `/${VITE_CASINO_NAME}/variables.css` как override.

`%VITE_PUBLIC_API_URL%` в `index.html` не используется.

## Слои и ответственность

### `app`

- Точка входа приложения.
- Провайдеры, роутер, глобальные стили.

### `routes`

- Композиция экранов по URL.
- Оркестрация feature-модулей.

### `features`

- Пользовательские сценарии (UI + локальная логика).
- Feature-модули изолированы.

### `entities`

- Долгоживущие кросс-страничные сущности.
- Общий state/API для feature.

### `domain`

- Чистые типы и pure-функции.
- Доменные маппинги и вычисления без React/Reatom/API.

### `shared`

- Только инфраструктура (`api`, `lib`, `types`, `ui-kit`, `reatom-context`).
- Без бизнес-правил.

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
- Импорт внутренних файлов чужого модуля в обход `index.ts`
- Upward-импорты `../` в `shared`, `entities`, `features`, `routes`

## Public API правило

Каждый модуль экспортируется через `index.ts`.

Примеры корректных импортов:

- `$features/catalog/product-list`
- `$entities/cart`
- `$domain/product`
- `$shared/ui-kit`

Примеры некорректных импортов:

- `$features/catalog/product-list/product-list.view`
- `$domain/product/product.types`
- `$shared/ui-kit/file-label`

## Машинные проверки

Архитектура проверяется линтером:

- Запрет `features -> features`
- Запрет deep-import мимо public API
- Запрет upward-импортов `../` в критичных слоях

## Команды

- `bun run dev` — dev server
- `bun run build` — production build
- `bun run lint` — ESLint (включая архитектурные ограничения)
