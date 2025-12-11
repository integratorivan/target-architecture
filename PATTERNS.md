---
applyTo: '**'
---
## 🎯 Принципы организации кода (LIFT)

### 1. Locate (Быстро находить)
> Мы должны быстро находить сущности по имени файла

**❌ Плохая практика:**
```
feature/
├── index.ts      # Что это? Непонятно без открытия
├── index.tsx     # А это что?
└── model/
    └── index.ts  # И это?
```

**✅ Хорошая практика:**
```
feature/
├── left-bar.view.tsx        # Сразу понятно - это view компонент
├── color-picker.reatom.ts   # Это reatom модель
└── preview-size.types.ts    # Это типы
```

### 2. Identify (Понимать назначение)
> По названию файла должно быть понятно, что это за сущность

**Суффиксы файлов:**
| Суффикс | Назначение | Пример |
|---------|------------|--------|
| `.view.tsx` | React компонент (view) | `left-bar.view.tsx` |
| `.reatom.ts` | Reatom модель (atoms, actions) | `color-picker.reatom.ts` |
| `.types.ts` | TypeScript типы | `preview-size.types.ts` |
| `.constants.ts` | Константы | `palette-groups.constants.ts` |
| `.utils.ts` | Утилитарные функции | `color-convert.utils.ts` |
| `.service.ts` | Сервисы (API, бизнес-логика) | `token-manager.service.ts` |
| `.hook.ts` | React хуки | `use-color-picker.hook.ts` |

**Примеры:**
```ts
useLocalStorageValue.hook.ts  // ← хук
left-bar.view.tsx             // ← компонент
user-mentions.service.ts      // ← сервис
user.reatom.ts                // ← reatom model
preview-size.types.ts         // ← типы
```

### 3. Flatten (Минимальная вложенность)
> Думать о вложенности стоит только когда в директории > 5-7 файлов

**При ≤5 файлах — плоская структура:**
```
features/customization/left-bar/
├── left-bar.view.tsx
├── left-bar.reatom.ts
├── left-bar.types.ts
└── color-item.view.tsx
```

**При >5 файлах — создаём подпапки:**
```
features/customization/left-bar/
├── ui/
│   ├── left-bar.view.tsx
│   ├── color-item.view.tsx
│   └── accordion-section.view.tsx
├── model/
│   ├── left-bar.reatom.ts
│   └── color-picker.reatom.ts
└── left-bar.types.ts
```

### 4. DRY / WET Balance
- **DRY** (Don't Repeat Yourself) — не дублируй код
- **WET** (Write Everything Twice) — можно повторить дважды, прежде чем абстрагировать

> Не создавай абстракцию, пока не увидишь паттерн 2 раза

### 5. Explicit Public API
> В `index.ts` (Public API) экспортируем только то, что реально используется снаружи. Не используй `export *`.

**❌ Плохая практика:**
```ts
// features/auth/index.ts
export * from "./ui/auth-modal.view";
export * from "./model/auth.reatom";
export * from "./lib/auth.utils";
// Экспортируем кучу внутренних хелперов и компонентов, которые не нужны снаружи
```

**✅ Хорошая практика:**
```ts
// features/auth/index.ts
export { AuthModal } from "./ui/auth-modal.view";
export { authAtom, loginAction } from "./model/auth.reatom";
// Экспортируем только публичный контракт
```

---

## 📁 Структура проекта

### Сегментация Features
Features организованы по **сегментам** (доменным областям):

```
features/
├── customization/           # 🎨 Сегмент кастомизации
│   ├── left-bar/
│   │   ├── left-bar.view.tsx
│   │   ├── left-bar.reatom.ts
│   │   └── color-item.view.tsx
│   ├── right-bar/
│   │   ├── right-bar.view.tsx
│   │   └── screen-size-selector.view.tsx
│   └── preview-size.reatom.ts   # Общая модель для сегмента
│
├── authorization/           # 🔐 Сегмент авторизации
│   ├── auth-modal.view.tsx
│   ├── auth.reatom.ts
│   └── auth.types.ts
│
├── payments/                # 💰 Сегмент платежей
│   ├── refill-modal.view.tsx
│   ├── crypto-modal.view.tsx
│   └── payments.reatom.ts
│
└── betting/                 # 🎰 Сегмент ставок
    ├── betslip/
    └── sport-line/
```

### Полная структура проекта

```
├── pages/routes/                    
│   ├── +config.ts
│   ├── +Layout.tsx
│   ├── index/
│   ├── personal-area/
│   ├── casino/
│   └── betting/
│
├── features/                 # 🎯 Feature-сегменты
│   ├── customization/        # Кастомизация UI
│   ├── authorization/        # Авторизация
│   ├── payments/             # Платежи
│   └── betting/              # Ставки
│
├── entities/                 # Бизнес-сущности (переиспользуемые)
│   ├── player/
│   ├── theme/
│   └── locale/
```

---

## 📝 Примеры структуры

### Простая feature (≤5 файлов)
```
features/customization/right-bar/
├── right-bar.view.tsx           # Главный компонент
├── right-bar.types.ts           # Типы (если нужны)
├── screen-size-selector.view.tsx # Вложенный компонент
└── screen-size.constants.ts     # Константы
```

### Сложная feature (>5 файлов)
```
features/customization/left-bar/
├── ui/
│   ├── left-bar.view.tsx
│   ├── color-item.view.tsx
│   ├── accordion-section.view.tsx
│   └── color-picker-popover.view.tsx
├── model/
│   ├── left-bar.reatom.ts
│   ├── color-picker.reatom.ts
│   └── token-manager.service.ts
├── left-bar.types.ts
└── left-bar.constants.ts
```

### Общая модель сегмента
Если модель используется несколькими features в сегменте — выносим на уровень сегмента:
```
features/customization/
├── preview-size.reatom.ts       # Общая модель
├── customization.types.ts       # Общие типы сегмента
├── left-bar/
└── right-bar/
```

### State Management (Reatom)

**Naming Conventions:**
- Атомы: `someAtom` (постфикс Atom)
- Actions: `someAction` (постфикс Action)
- Файлы: `feature-name.reatom.ts`

**Пример:**
```tsx
// color-picker.reatom.ts
export const lightPaletteAtom = atom<PaletteRecord>({}, "lightPaletteAtom");
export const darkPaletteAtom = atom<PaletteRecord>({}, "darkPaletteAtom");

export const updateLightTokenAction = action((ctx, key: string, value: string) => {
  const current = ctx.get(lightPaletteAtom);
  lightPaletteAtom(ctx, { ...current, [key]: value });
}, "updateLightTokenAction");
```

**Использование в компонентах:**
```tsx
// left-bar.view.tsx
export const LeftBar: FC = reatomComponent(({ ctx }) => {
  const palette = ctx.spy(lightPaletteAtom);
  
  return (
    <button onClick={() => updateLightTokenAction(ctx, "primary", "#fff")}>
      Update
    </button>
  );
}, "LeftBar");
```

**Когда создавать actions:**
- ✅ Комплексные операции с несколькими атомами
- ✅ Асинхронные операции
- ❌ Простые set операции — вызывай атом напрямую

**❌ Плохая практика:**
```ts
const handleRowClick = (rowId: string) => {
    selectedPeriodTableRowAtom(ctx, selectedRowId === rowId ? null : rowId);
};

...

onClick={() => handleRowClick(row.id)}
```

**✅ Хорошая практика:**
```ts
onClick={() => selectedPeriodTableRowAtom(ctx, selectedRowId === rowId ? null : rowId);}
```


### Path Aliases
```ts
$shared    → ./shared
$features  → ./features
$entities  → ./entities
$variants  → ./variants
$pages     → ./pages
```

---

## ✅ Code Style

### Именование файлов
- Всё в **kebab-case**: `left-bar.view.tsx`, `color-picker.reatom.ts`
- Суффиксы обязательны: `.view.tsx`, `.reatom.ts`, `.types.ts` и т.д.

### Компоненты
```tsx
// ✅ Правильно
import type { FC } from "react";
import type { LeftBarProps } from "./left-bar.types";

export const LeftBar: FC<LeftBarProps> = ({ items }) => {
  return <div>{/* ... */}</div>;
};
```

### Типы
```tsx
// left-bar.types.ts
export interface LeftBarProps {
  items: ColorItem[];
}

export interface ColorItem {
  key: string;
  value: string;
}
```

---

## 📚 Quick Reference

| Что создаю | Суффикс | Пример |
|------------|---------|--------|
| React компонент | `.view.tsx` | `left-bar.view.tsx` |
| Reatom модель | `.reatom.ts` | `preview-size.reatom.ts` |
| Типы | `.types.ts` | `color-picker.types.ts` |
| Константы | `.constants.ts` | `palette.constants.ts` |
| Утилиты | `.utils.ts` | `color-convert.utils.ts` |
| Сервис | `.service.ts` | `token-manager.service.ts` |
| Хук | `.hook.ts` | `use-color-picker.hook.ts` |
