export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'nl', 'ru', 'ua'],
} as const

export type Locale = (typeof i18n)['locales'][number]
