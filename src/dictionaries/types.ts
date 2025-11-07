// Type definitions for dictionaries
export type Dictionary = {
  home: {
    getStarted: string
    saveChanges: string
    deployNow: string
    readDocs: string
    learn: string
    examples: string
    goToNextjs: string
  }
  products: {
    cart: string
  }
}

// Type for comprehensive locale data
export type LocaleData = {
  common: any
  soft: any
  facades: any
  about: any
}

export type FullDictionary = Dictionary & {
  locale: LocaleData
}
