import 'server-only'
import type {Dictionary, LocaleData} from './types'
import type {Locale} from '@/i18n-config'

const dictionaries = {
    en: () => import('./en.json').then((module) => module.default as Dictionary),
    nl: () => import('./nl.json').then((module) => module.default as Dictionary),
    ru: () => import('./ru.json').then((module) => module.default as Dictionary),
    ua: () => import('./ua.json').then((module) => module.default as Dictionary),
}

// Load comprehensive locale data from locales directory
const loadLocaleData = async (locale: Locale): Promise<LocaleData> => {
    try {
        const [common, soft, facades, about] = await Promise.all([
            import(`../../locales/${locale}/common.json`).then(m => m.default as LocaleData['common']).catch(() => ({} as LocaleData['common'])),
            import(`../../locales/${locale}/soft.json`).then(m => m.default as LocaleData['soft']).catch(() => ({} as LocaleData['soft'])),
            import(`../../locales/${locale}/facades.json`).then(m => m.default as LocaleData['facades']).catch(() => ({} as LocaleData['facades'])),
            import(`../../locales/${locale}/about.json`).then(m => m.default as LocaleData['about']).catch(() => ({} as LocaleData['about'])),
        ])

        return {common, soft, facades, about}
    } catch (error) {
        console.error(`Failed to load locale data for ${locale}:`, error)
        return {
            common: {} as LocaleData['common'],
            soft: {} as LocaleData['soft'],
            facades: {} as LocaleData['facades'],
            about: {} as LocaleData['about']
        }
    }
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    const dict = await dictionaries[locale]?.()
    return dict || dictionaries.en()
}

export const getFullDictionary = async (locale: Locale) => {
    const [dict, localeData] = await Promise.all([
        getDictionary(locale),
        loadLocaleData(locale),
    ])

    return {
        ...dict,
        locale: localeData,
    }
}