# Translation System Documentation

## Overview

This project uses a Next.js 15 App Router-based internationalization (i18n) system with support for multiple languages: English (en), Dutch (nl), Russian (ru), and Ukrainian (ua).

## Architecture

### 1. Locale Configuration (`src/i18n-config.ts`)
Defines available locales and the default locale:
```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'nl', 'ru', 'ua'],
} as const
```

### 2. Dictionary System (`src/dictionaries/`)
Each locale has its own JSON file containing translations:
- `en.json` - English translations
- `nl.json` - Dutch translations
- `ru.json` - Russian translations
- `ua.json` - Ukrainian translations

The `dictionaries.ts` file provides a function to load the appropriate dictionary:
```typescript
export const getDictionary = async (locale: 'en' | 'nl' | 'ru' | 'ua') =>
    dictionaries[locale]?.()
```

### 3. Middleware (`middleware.ts`)
Automatically detects user language preferences and redirects to the appropriate locale:
- Reads the `Accept-Language` header
- Matches against available locales
- Redirects users to `/{locale}/...` URLs

### 4. Locale Routing (`src/app/[lang]/`)
Uses Next.js dynamic segments to handle locale-specific pages:
- `[lang]/page.tsx` - Localized home page
- `[lang]/layout.tsx` - Sets the HTML lang attribute

## How It Works

1. User visits the root URL (`/`)
2. Middleware detects their preferred language
3. User is redirected to `/{locale}/` (e.g., `/ru/`, `/ua/`, `/en/`)
4. The page loads the appropriate dictionary
5. All text content is displayed in the selected language

## Adding New Translations

### For Existing Pages

1. Add new keys to all dictionary files:
```json
// src/dictionaries/ru.json
{
  "home": {
    "newKey": "Новый текст"
  }
}
```

2. Use in your components:
```typescript
const dict = await getDictionary(lang)
<p>{dict?.home.newKey}</p>
```

### For New Languages

1. Add locale to `src/i18n-config.ts`:
```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'nl', 'ru', 'ua', 'de'], // Added 'de'
}
```

2. Create dictionary file `src/dictionaries/de.json`

3. Update `src/dictionaries/dictionaries.ts`:
```typescript
const dictionaries = {
  // ... existing
  de: () => import('./de.json').then((module) => module.default),
}
```

## Current Translations

### Home Page (Russian)
- Get started by editing → Начните с редактирования
- Save and see your changes instantly → Сохраните и сразу увидите изменения
- Deploy now → Развернуть сейчас
- Read our docs → Читать документацию
- Learn → Обучение
- Examples → Примеры
- Go to nextjs.org → Перейти на nextjs.org

### Home Page (Ukrainian)
- Get started by editing → Почніть з редагування
- Save and see your changes instantly → Збережіть та одразу побачите зміни
- Deploy now → Розгорнути зараз
- Read our docs → Читати документацію
- Learn → Навчання
- Examples → Приклади
- Go to nextjs.org → Перейти на nextjs.org

## URL Structure

- `/` → Redirects to detected locale
- `/en/` → English version
- `/ru/` → Russian version
- `/ua/` → Ukrainian version
- `/nl/` → Dutch version

## Testing

To test different locales:
1. Visit `http://localhost:3000/ru/` for Russian
2. Visit `http://localhost:3000/ua/` for Ukrainian
3. Visit `http://localhost:3000/en/` for English
4. Visit `http://localhost:3000/nl/` for Dutch

## Additional Resources

The project also contains a separate `locales/` directory with more comprehensive translations for other parts of the application. These can be integrated with the dictionary system as needed.
