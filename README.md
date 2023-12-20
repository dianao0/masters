## Запуск проекту

```
npm install - встановлення залежностей
npm run start:dev або npm run start:dev:vite - запуск сервера + frontend проекту в dev режимі
```

----

## Скрипти

- `npm run start` - Запуск frontend проекту на webpack dev server
- `npm run start:vite` - Запуск frontend проекту на vite
- `npm run start:dev` - Запуск frontend проекту на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекту на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Збірка в prod режимі
- `npm run build:dev` - Збірка в dev режимі (не мінімізований)
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером
- `npm run test:unit` - Запуск unit тестів з jest
- `npm run test:ui` - Запуск скріншотних тестів з loki
- `npm run test:ui:ok` - Підтвердження нових скріншотів
- `npm run test:ui:ci` - Запуск скріншотних тестів в CI
- `npm run test:ui:report` - Генерація повного звіту для скріншотних тестов
- `npm run test:ui:json` - Генерація json звіту для скріншотних тестов
- `npm run test:ui:html` - Генерація HTML звіту для скріншотних тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Збірка storybook білда
- `npm run prepare` - прекомміт хуки

----

## Архітектура проекту

Проект написаний відповідно до методології Feature sliced ​​design

Посилання на документацію - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Робота з перекладами

В проекті використовується бібліотека i18next для роботы з перекладами.
Файли з перекладами знаходяться в public/locales.

Документація i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тести

В проекті використовуються 4 види тестів:
1) Звичайні unit тести на jest - `npm run test:unit`
2) Тести на компоненти з React testing library -`npm run test:unit`
3) Скріншотне тестування з loki `npm run test:ui`
4) e2e тестування з Cypress `npm run test:e2e`

----

## Лінтінг

В проекті використовується eslint для перевірки typescript коду та stylelint для перевірки файлів з стилями.

##### Запуск лінтерів
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером

----

## Storybook

В проекті для кожного компонента описуються сторі-кейси.
Запити на сервер мокаються за допомогою storybook-addon-mock.

Запустити сторібук можна командою:
- `npm run storybook`

Приклад:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```


----

## Конфігурація проекту

Для розробки проект містить 2 конфіга:
1. Webpack - ./config/build
2. vite - vite.config.ts

Обидва бандлера адаптовані під основні фічі додатку.

Вся конфігурація знаходиться в /config
- /config/babel - babel
- /config/build - конфігурація webpack
- /config/jest - конфігурація тестового середовища
- /config/storybook - конфігурація сторібуку

----

## CI pipeline та pre commit хуки

Конфигурація github actions знаходится в /.github/workflows.
В ci запускаються всі види тестів, збірка проекту та сторібуку, лінтинг.

В прекомміт хуках перевіряється проект лінтерами, конфіг знаходится в /.husky

----

### Робота з даними

Взаємодія з даними здійснюється за допомогою redux toolkit.
По можливості сутності, що перевикористовуються, необхідно нормалізувати за допомогою EntityAdapter

Запити на сервер надсилаються за допомогою [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного підключення редюсерів (щоб не тягнути їх у загальний бандл) використовується [DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

### Робота з feature-flag

Дозволено використання feature flags тільки за допомогою хелпера toggleFeatures

до нього передається об'єкт із опціями

{
   name: назва feature-flag, 
   on: функція, яка відпрацює після Увімкнення фічі
   of: функція, яка відпрацює після Вимкнення фічі
}

Для автоматичного видалення фічі використовувати скрипт remove-feature.ts,
який приймає 2 аргументи
1. Назва feature-flag, що видаляється
2. Стан (on\off)

----

## Сутності (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фічі (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleEditForm](/src/features/articleEditForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
