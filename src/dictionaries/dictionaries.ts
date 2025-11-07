import 'server-only'

const dictionaries = {
    en: () => import('./en.json').then((module) => module.default),
    nl: () => import('./nl.json').then((module) => module.default),
    ru: () => import('./ru.json').then((module) => module.default),
    ua: () => import('./ua.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'nl' | 'ru' | 'ua') =>
    dictionaries[locale]?.()