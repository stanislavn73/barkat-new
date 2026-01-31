# Translation System Documentation

## Overview

This project uses a comprehensive, type-safe Next.js 15 App Router-based internationalization (i18n) system with SSR (Server-Side Rendering) support for multiple languages: English (en), Dutch (nl), Russian (ru), and Ukrainian (ua).

The system provides two levels of translation support:
1. **Simple Dictionaries** - For basic page content (home page, UI elements)
2. **Comprehensive Locale Data** - For detailed content (soft, facades, about, common sections)

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

#### Type-Safe Dictionary Types (`types.ts`)
All dictionaries are strictly typed for TypeScript safety:
```typescript
export type Dictionary = {
  home: { getStarted: string; saveChanges: string; ... }
  products: { cart: string }
}

export type LocaleData = {
  common: any
  soft: any
  facades: any
  about: any
}
```

#### Simple Dictionaries
Each locale has its own JSON file containing basic translations:
- `en.json` - English translations
- `nl.json` - Dutch translations
- `ru.json` - Russian translations
- `ua.json` - Ukrainian translations

#### Comprehensive Locale Data (`locales/` directory)
Extensive translations organized by section:
- `common.json` - Common UI elements, headers, forms
- `soft.json` - 3D solutions and software products
- `facades.json` - Ventilated facades content
- `about.json` - About company information

#### Dictionary Loaders (`dictionaries.ts`)

**For simple pages:**
```typescript
export const getDictionary = async (locale: Locale): Promise<Dictionary>
```

**For comprehensive pages:**
```typescript
export const getFullDictionary = async (locale: Locale)
// Returns both simple dictionary + all locale data
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

## How It Works (SSR Translation Flow)

1. **Request:** User visits the root URL (`/`)
2. **Middleware:** Detects preferred language from `Accept-Language` header
3. **Redirect:** User is redirected to `/{locale}/` (e.g., `/ru/`, `/ua/`, `/en/`)
4. **Server-Side Rendering:**
   - Next.js App Router receives the locale parameter
   - Page component calls `getDictionary(lang)` or `getFullDictionary(lang)`
   - Dictionary is loaded server-side before HTML generation
   - Type-safe access to translations with full IntelliSense
5. **Response:** Fully translated HTML is sent to the client (SSR)
6. **Hydration:** React hydrates the pre-rendered content

### Benefits of this SSR Approach:
- ✅ **No Flash of Untranslated Content (FOUT)** - Content arrives already translated
- ✅ **SEO Friendly** - Search engines see translated content
- ✅ **Type Safe** - Full TypeScript support with autocomplete
- ✅ **Performance** - Translations loaded in parallel with other data
- ✅ **Zero Client-Side JavaScript** for translations - All handled server-side

## Adding New Translations

### For Simple Pages (Basic Content)

1. Update the `Dictionary` type in `src/dictionaries/types.ts`:
```typescript
export type Dictionary = {
  home: {
    getStarted: string
    newKey: string  // Add new key
  }
  // ...
}
```

2. Add translations to all dictionary files:
```json
// src/dictionaries/ru.json
{
  "home": {
    "newKey": "Новый текст"
  }
}
```

3. Use in your components (with type safety!):
```typescript
export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
    const {lang} = await params;
    const dict: Dictionary = await getDictionary(lang)

    return <p>{dict.home.newKey}</p>  // TypeScript autocomplete works!
}
```

### For Comprehensive Pages (Detailed Content)

1. Add content to all locale files in `locales/{locale}/`:
```json
// locales/ru/soft.json
{
  "newProduct": {
    "title": "Новый продукт",
    "description": "Описание"
  }
}
```

2. Use `getFullDictionary` in your page:
```typescript
export default async function SoftPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const {lang} = await params;
    const dict = await getFullDictionary(lang)

    return (
        <div>
            <h1>{dict.locale.soft.newProduct.title}</h1>
            <p>{dict.locale.soft.newProduct.description}</p>
        </div>
    )
}
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

## Example Pages

### Simple Page (Home)
Location: `src/app/[lang]/page.tsx`
- Uses: `getDictionary(lang)`
- Content: Basic UI elements
- Example: `/ru/`, `/ua/`, `/en/`

### Comprehensive Page (Soft)
Location: `src/app/[lang]/soft/page.tsx`
- Uses: `getFullDictionary(lang)`
- Content: Detailed product information
- Example: `/ru/soft`, `/ua/soft`, `/en/soft`

## Testing

### Local Development
```bash
npm run dev
```

Visit different locales:
1. `http://localhost:3000/ru/` - Russian home page
2. `http://localhost:3000/ua/` - Ukrainian home page
3. `http://localhost:3000/en/` - English home page
4. `http://localhost:3000/nl/` - Dutch home page
5. `http://localhost:3000/ru/soft` - Russian soft page (comprehensive example)
6. `http://localhost:3000/ua/soft` - Ukrainian soft page

### Build Test
```bash
npm run build
npm start
```

## Best Practices

1. **Always use type-safe approach:**
   ```typescript
   const dict: Dictionary = await getDictionary(lang)  // ✅ Good
   const dict = await getDictionary(lang)              // ⚠️ Loses type safety
   ```

2. **Choose the right loader:**
   - Use `getDictionary()` for simple UI text
   - Use `getFullDictionary()` for content-heavy pages

3. **Avoid optional chaining:**
   ```typescript
   {dict.home.title}   // ✅ Good - types guarantee it exists
   {dict?.home?.title} // ❌ Unnecessary - adds runtime overhead
   ```

4. **Keep translations organized:**
   - Simple UI text → `src/dictionaries/`
   - Comprehensive content → `locales/{locale}/`

## Performance Characteristics

- **Initial Load:** All dictionaries loaded server-side in parallel
- **Route Changes:** Dictionaries cached per locale (no reload needed)
- **Bundle Size:** Translations not included in client bundle
- **Rendering:** Fully rendered HTML with translations (SSR)
