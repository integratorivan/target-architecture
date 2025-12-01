# Инструкция для LLM по работе с Feature-Sliced проектами

## Обзор архитектуры

Это React-приложение построено по методологии **Feature-Sliced Design (FSD)** на современном стеке:

- **Фронтенд**: React 19 + TypeScript
- **Управление состоянием**: Reatom (реактивное управление состоянием)
- **Роутинг**: TanStack Router с файловой маршрутизацией
- **Сборщик**: Vite с PWA-поддержкой
- **HTTP-клиент**: Ky для API запросов
- **Стили**: CSS с темизацией через переменные окружения

## Структура слоев FSD

```
src/
├── app/           # Настройка приложения и провайдеры
├── shared/        # Общие утилиты, типы, API, доменная логика
├── entities/      # Бизнес-сущности
├── features/      # Пользовательские функции
├── widgets/       # Компонуемые UI компоненты
└── pages/         # Компоненты страниц
```

### Описание слоев

**app** - конфигурация приложения:
- `main.tsx` - точка входа, инициализация Reatom контекста и роутера
- `global.css` - глобальные стили
- `global-variable.css` - CSS-переменные для темизации

**shared** - переиспользуемый код:
- `api/` - HTTP клиент и адаптеры API
- `lib/` - утилиты, хуки, константы
- `types/` - TypeScript типы
- `reatom-context/` - глобальный контекст Reatom
- `domain/` - чистая бизнес-логика и модели данных

**entities** - бизнес-сущности:
- Модели данных и бизнес-логика
- Готово к реализации

**features** - пользовательские сценарии:
- Каждый фича содержит: `*.model.ts`, `*.types.ts`, `*.view.tsx`
- Простые фичи: `cart/`, `user-card/`
- Сегментированные фичи: `catalog/product-list/`, `catalog/card-product/`, `header/cart/`
- Shared-фичи: `shared/user-block/`

**widgets** - компонуемые UI компоненты:
- Переиспользуемые компоненты
- Готово к реализации

**pages** - страницы маршрутизации:
- Используют TanStack Router
- Комбинируют фичи и виджеты в полноценные страницы

*Примечание: В текущем проекте используется `routes/` вместо `pages/` для интеграции с TanStack Router*

## Ключевые паттерны

### 0. Настройка Reatom Context

```typescript
// shared/reatom-context/index.ts
import { createCtx } from '@reatom/framework';

export const reatomCtx = createCtx();

// app/main.tsx - предоставление контекста
<reatomContext.Provider value={reatomCtx}>
    <RouterProvider router={router} />
</reatomContext.Provider>
```

### 1. Управление состоянием (Reatom)

```typescript
// Создание массива атомов
export const addedProductsArray = reatomArray<CartProductModel>([], 'addedProductsArray');

// Создание действия с использованием доменной логики
export const addProductToCartAction = action((ctx, product: ProductModel) => {
    const currentCart = ctx.get(addedProductsArray);
    addedProductsArray(ctx, addProductToCart(product, currentCart));
}, 'addProductToCartAction');

// Создание простого атома
export const baseAtom = atom('initial value', 'baseAtom');
```

### 2. API слой

```typescript
// Базовый HTTP клиент с автоматической авторизацией
export const api = createApiInstance();

// Типизированные запросы
export const getProducts = () => api.get('products').json<ProductModel[]>();
export const getUserList = (): Promise<UserListDTO> => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        });
};
```

### 3. Роутинг

Файловая маршрутизация с автогенерацией:
```typescript
// routes/catalog/index.route.tsx
export const Route = createFileRoute('/catalog')({
    component: CatalogPage,
});
```

### 4. Псевдонимы путей

Все каталоги имеют псевдонимы с префиксом `$`:
```typescript
import { api } from '$shared/api/instance';
import { CartView } from '$features/cart/cart.view';
```

## Правила работы с кодом

### 1. Принципы FSD
- **Снизу-вверх**: `$shared` → `$entities` → `$features` → `$pages`
- **Изоляция**: Верхние слои не знают о нижних
- **API**: Взаимодействие через публичные API слоев

### 2. Именование файлов
- Модели: `*.model.ts` (бизнес-логика, состояние)
- Типы: `*.types.ts` (TypeScript определения)
- Представления: `*.view.tsx` (React компоненты)
- Индексы: `index.ts` (публичные экспорты)

### 3. Импорты
- Использовать псевдонимы путей: `$shared/lib/utils`
- Сортировка импортов: внешние → внутренние → абсолютные
- Предпочитать index.ts для чистоты импортов

### 4. Компоненты
- Разделять логику (model) и представление (view)
- Использовать Reatom хуки для состояния
- Минимизировать пропсы, выносить состояние в модель

### 5. Типизация
- Строгая TypeScript типизация
- Valibot для валидации данных
- Совместимость с Reatom типами

## Частые сценарии

### Добавление новой фичи

**Простая фича:**
1. Создать папку `$features/feature-name/`
2. Определить `feature.types.ts`
3. Реализовать `feature.model.ts` с Reatom
4. Создать `feature.view.tsx` компонент
5. Добавить `index.ts` с экспортами

**Сегментированная фича:**
1. Создать папку `$features/segmented/feature-name/`
2. Определить `feature.types.ts`
3. Реализовать `feature.model.ts` с Reatom
4. Создать `feature.view.tsx` компонент
5. Добавить `index.ts` с экспортами

**Shared-фича:**
1. Создать папку `$features/shared/feature-name/`
2. Определить `feature.types.ts`
3. Реализовать `feature.model.ts` с Reatom
4. Создать `feature.view.tsx` компонент
5. Добавить `index.ts` с экспортами

### Интеграция с API
1. Определить типы в `$shared/api/*/types.ts`
2. Создать адаптер в `$shared/api/*/adapter.ts`
3. Реализовать запросы через `api` клиент
4. Обрабатывать ошибки централизованно

## Подробное руководство по работе с API

### Структура API слоев

```
$shared/api/
├── instance.ts              # Базовый HTTP клиент
├── product-list/           # Пример API модуля
│   ├── index.ts           # Функции запросов
│   └── types.ts           # DTO типы
├── user/                  # Модуль пользователей
│   ├── index.ts           # Функции запросов
│   └── types.ts           # DTO типы
└── adapters/              # Адаптеры DTO → Domain
    ├── product-list.adapter.ts
    └── user.adapter.ts
```

### Шаг 1: Создание API типов (DTO)

Для новой сущности (например, пользователей) создайте:
```typescript
// $shared/api/user/types.ts
export type UserDTO = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    };
};

export type UserListDTO = UserDTO[];
```

### Шаг 2: Создание функции API запроса

```typescript
// $shared/api/user/index.ts
import type { UserListDTO } from './types';

export const getUserList = (): Promise<UserListDTO> => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        });
};
```

### Шаг 3: Создание доменных типов

```typescript
// $shared/domain/user/user.types.ts
export type UserModel = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: string;
    address: string;
};
```

### Шаг 3.1: Создание доменной логики (чистые функции)

```typescript
// $shared/domain/cart/cart.model.ts
import type { ProductModel } from '../product/product.types';
import type { CartProductModel } from './cart.types';

export const addProductToCart = (
    newProduct: ProductModel,
    productList: CartProductModel[],
    now: () => Date = () => new Date(),
): CartProductModel[] => {
    return [...productList, { ...newProduct, date_added: now() }];
};

export const removeProductById = (
    productList: CartProductModel[],
    productId: CartProductModel['id'],
): CartProductModel[] => {
    return productList.filter(({ id }) => id !== productId);
};

export const hasProduct = (
    productList: CartProductModel[],
    productId: CartProductModel['id'],
): boolean => {
    return productList.some(({ id }) => id === productId);
};
```

### Шаг 4: Создание адаптера DTO → Domain

```typescript
// $shared/api/adapters/user.adapter.ts
import type { UserDTO, UserListDTO } from '$shared/api/user/types';
import type { UserModel } from '$shared/domain/user/user.types';

export const mapUserListDtoToDomain = (dto: UserListDTO): UserModel[] => {
    return dto.map((item) => ({
        id: item.id,
        name: item.name,
        username: item.username,
        email: item.email,
        phone: item.phone,
        website: item.website,
        company: item.company.name,
        address: `${item.address.street}, ${item.address.city}, ${item.address.zipcode}`,
    }));
};
```

### Шаг 5: Создание Reatom ресурса в feature

```typescript
// $features/user-card/user-card.model.ts
import { reatomResource, withDataAtom, withStatusesAtom } from '@reatom/framework';

import { mapUserListDtoToDomain } from '$shared/api/adapters/user.adapter';
import { getUserList } from '$shared/api/user';

export const userCardResource = reatomResource((ctx) => {
    return ctx.schedule(async () => {
        const userList = await getUserList();
        return mapUserListDtoToDomain(userList);
    });
}, 'userCardResource').pipe(withDataAtom([]), withStatusesAtom());
```

### Шаг 6: Создание view компонента

```typescript
// $features/user-card/user-card.view.tsx
import { reatomComponent } from '@reatom/npm-react';
import { FileLabel } from '$shared/ui-kit/file-label';
import { CardUserView } from './card-user/card-user.view';
import { userCardResource } from './user-card.model';

export const UserCardListView = reatomComponent(({ ctx }) => {
    const userList = ctx.spy(userCardResource.dataAtom);
    const userListStatus = ctx.spy(userCardResource.statusesAtom);

    if (userListStatus.isPending) {
        return <div style={{ padding: '10px', color: 'red' }}>Loading users...</div>;
    }

    return (
        <div style={{
            background: '#f7f7f7ff',
            border: '1px solid #449cd3ff',
            borderRadius: '12px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            position: 'relative',
        }}>
            <FileLabel color="#449cd3ff" position="left">
                src/features/user-card/user-card.view.tsx
            </FileLabel>
            {userList.map((user) => (
                <CardUserView key={user.id} {...user} />
            ))}
        </div>
    );
}, 'UserCardListView');
```

### Шаг 6.1: Простой компонент с массивом атомов

```typescript
// $features/header/cart/cart.view.tsx
import { reatomComponent } from '@reatom/npm-react';
import { FileLabel } from '$shared/ui-kit/file-label';
import { addedProductsArray } from '$features/cart/cart.model';

export const CartView = reatomComponent(({ ctx }) => {
    const addedProducts = ctx.spy(addedProductsArray);

    if (addedProducts.length === 0) {
        return (
            <div style={{
                padding: '8px',
                position: 'relative',
                border: '2px solid #735BE8',
                borderRadius: 8,
            }}>
                <FileLabel color="#735BE8">features/header/cart/cart.view.tsx</FileLabel>
                <div data-id="empty-cart">Your cart is empty.</div>
            </div>
        );
    }

    return addedProducts.map((product, index) => (
        <div key={index} style={{
            border: '1px solid #735BE8',
            padding: '8px',
            borderRadius: '8px',
            position: 'relative',
            margin: 2,
        }}>
            <FileLabel color="#735BE8">features/header/cart/cart.view.tsx</FileLabel>
            <div data-id="product-name">Product: {product.title}</div>
            <div data-id="product-price">Price: ${product.price}</div>
        </div>
    ));
}, 'CartView');
```

### Шаг 7: Экспорт в index.ts

```typescript
// $features/user-card/index.ts
export { UserCardListView } from './user-card.view';
export { CardUserView } from './card-user/card-user.view';
export { userCardResource } from './user-card.model';
```

### Шаг 8: Использование на странице

```typescript
// $routes/account/index.route.tsx
import { createFileRoute } from '@tanstack/react-router';
import { UserCardListView } from '$features/user-card';

export const Route = createFileRoute('/account/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="account-page">
            <h1>Личный кабинет</h1>
            <UserCardListView />
        </div>
    );
}
```

## Паттерны для разных типов API запросов

### GET запросы (чтение данных)
```typescript
// Простые GET запросы
export const getUsers = () => api.get('users').json<UserDTO[]>();
export const getUserById = (id: number) => api.get(`users/${id}`).json<UserDTO>();

// Reatom resource pattern
export const usersResource = reatomResource((ctx) => {
    return ctx.schedule(() => getUsers());
}, 'usersResource').pipe(withDataAtom([]), withStatusesAtom());
```

### Мутации данных (POST/PUT/DELETE) - современный подход с reatomAsync

**reatomAsync** - для асинхронных операций (изменение данных)
```typescript
// Создание пользователя
export const createUserAsync = reatomAsync(async (ctx, userData: CreateUserPayload) => {
    const dto = mapCreateUserPayloadToDto(userData);
    const result = await createUser(dto);

    // Обновляем usersResource после успешного создания
    const currentUsers = ctx.get(usersResource.dataAtom);
    usersResource(ctx, [...currentUsers, mapUserDtoToDomain(result)]);

    return result;
}, 'createUserAsync').pipe(
    withStatusesAtom(),
    withErrorAtom((ctx, error) => {
        console.error('Create user error:', error);
    })
);

// Обновление пользователя
export const updateUserAsync = reatomAsync(async (ctx, params: { id: number; userData: UpdateUserPayload }) => {
    const { id, userData } = params;
    const dto = mapUpdateUserPayloadToDto(userData);
    const result = await updateUser(id, dto);

    // Обновляем usersResource после успешного обновления
    const currentUsers = ctx.get(usersResource.dataAtom);
    usersResource(ctx, currentUsers.map(user =>
        user.id === id ? mapUserDtoToDomain(result) : user
    ));

    return result;
}, 'updateUserAsync').pipe(
    withStatusesAtom(),
    withErrorAtom((ctx, error) => {
        console.error('Update user error:', error);
    })
);

// Удаление пользователя
export const deleteUserAsync = reatomAsync(async (ctx, id: number) => {
    await deleteUser(id);

    // Удаляем из usersResource после успешного удаления
    const currentUsers = ctx.get(usersResource.dataAtom);
    usersResource(ctx, currentUsers.filter(user => user.id !== id));

    return id; // Возвращаем ID для дополнительной логики если нужно
}, 'deleteUserAsync').pipe(
    withStatusesAtom(),
    withErrorAtom((ctx, error) => {
        console.error('Delete user error:', error);
    })
);
```

### Использование reatomAsync в компонентах

```typescript
export const UserManagementView = reatomComponent(({ ctx }) => {
    const users = ctx.spy(usersResource.dataAtom);

    // Получаем статусы async операций
    const createStatus = ctx.spy(createUserAsync.statusesAtom);
    const updateStatus = ctx.spy(updateUserAsync.statusesAtom);
    const deleteStatus = ctx.spy(deleteUserAsync.statusesAtom);

    const isProcessing = createStatus.isPending || updateStatus.isPending || deleteStatus.isPending;

    const handleCreateUser = (userData: CreateUserPayload) => {
        createUserAsync(ctx, userData);
    };

    const handleUpdateUser = (id: number, userData: UpdateUserPayload) => {
        updateUserAsync(ctx, { id, userData });
    };

    const handleDeleteUser = (id: number) => {
        deleteUserAsync(ctx, id);
    };

    return (
        <div>
            {isProcessing && <div>Processing...</div>}
            {/* UI компоненты с обработчиками */}
        </div>
    );
}, 'UserManagementView');
```

## Валидация данных

Используйте Valibot для валидации API ответов:

```typescript
import { object, string, number, array } from 'valibot';

const UserSchema = object({
    id: number(),
    name: string(),
    email: string(),
    username: string(),
});

const UserListSchema = array(UserSchema);

export const getUsers = async (): Promise<UserModel[]> => {
    const response = await api.get('users').json();
    const validated = parse(UserListSchema, response);
    return mapUserListDtoToDomain(validated);
};
```

## Обработка ошибок

Создайте централизованную обработку ошибок:

```typescript
// $shared/lib/api/errors.ts
export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const handleApiError = (error: unknown): ApiError => {
    if (error instanceof ApiError) {
        return error;
    }
    if (error instanceof Error) {
        return new ApiError(error.message);
    }
    return new ApiError('Unknown API error');
};
```

Эта структура обеспечивает:
- **Разделение ответственности**: DTO ↔ Domain ↔ UI
- **Типизацию**: Строгие TypeScript типы на всех уровнях
- **Реактивность**: Reatom управление состоянием
- **Валидацию**: Проверка данных от API
- **Обработку ошибок**: Централизованная обработка
- **Масштабируемость**: Легкое добавление новых эндпоинтов

### Работа с состоянием
1. Создавать атомы в `*.model.ts`
2. Использовать `reatomComponent` и `ctx.spy()` в компонентах
3. Разделять данные и UI состояние
4. Использовать действия для side effects
5. Использовать кастомные утилиты из `$shared/lib/utils/reatom.ts`

### Дополнительные утилиты Reatom

```typescript
// $shared/lib/utils/reatom.ts - custom ready state utility
export const withReadyAtom =
    <T extends AsyncAction & { dataAtom?: Atom }>(initState = false) =>
    (anAsync: T): T & { readyAtom: Atom<boolean> } => {
        const readyAtom = atom((ctx, state?: boolean) => {
            if (anAsync.dataAtom) ctx.spy(anAsync.dataAtom);
            const pending = ctx.spy(anAsync.pendingAtom);
            return state === undefined ? initState : pending === 0;
        }, 'readyAtom');

        anAsync.pendingAtom.onChange((ctx) => {
            ctx.get(readyAtom);
        });

        return Object.assign(anAsync, { readyAtom });
    };
```

## Инструменты разработки

### Команды
```bash
bun run dev      # Запуск dev-сервера (порт 3002)
bun run build    # Сборка проекта
bun run lint     # Проверка кода
bun run preview  # Предпросмотр сборки
bun run knip     # Проверка неиспользуемого кода
```

### ESLint правила
- `simple-import-sort` - сортировка импортов
- `typescript-sort-keys` - сортировка ключей объектов
- `unused-imports` - удаление неиспользуемых импортов
- `@reatom/eslint-plugin` - правила для Reatom

## Анти-паттерны

1. **Нарушение иерархии**: импорты из `$features` в `$shared`
2. **Раздувание компонентов**: логика в `*.view.tsx` вместо `*.model.ts`
3. **Прямые DOM манипуляции**: использовать React паттерны
4. **Хардкод значений**: выносить в константы или окружение
5. **Игнорирование типов**: использовать строгую типизацию

## Рекомендации по развитию

1. **Постепенное наращивание**: начинать с `$shared`, двигаться вверх
2. **Тестируемость**: изолировать логику в моделях для легкого тестирования
3. **Производительность**: использовать Reatom оптимизации, мемоизацию
4. **Документация**: поддерживать CLAUDE.md актуальным
5. **Консистентность**: следовать установленным паттернам именования

Эта архитектура обеспечивает масштабируемость, поддерживаемость и предсказуемую структуру кода для проектов любой сложности.