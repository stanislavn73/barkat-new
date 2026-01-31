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

// Type definitions for comprehensive locale data
export interface CommonLocale {
  header?: Record<string, string>
  contactUsButton?: string
  checkPrice?: string
  buyButton?: string
  downloadButton?: string
  consultation?: {
    formName?: string
    name?: string
    surName?: string
    company?: string
    title?: string
    phone?: string
    question?: string
    send?: string
    sending?: string
    sent?: string
    error?: string
    emailError?: string
    phoneError?: string
  }
}

export interface SoftLocale {
  solutions?: {
    title: string
    description: string
  }
  teamViewerFrontline?: string
  xPick?: {
    resume?: string
    modal?: {
      general?: string
      keys?: Array<{
        title: string
        key: string
      }>
      advantages?: string[]
      useCases?: string[]
      benefits?: string[]
      integration?: string
      summary?: string
    }
  }
  xMake?: {
    resume?: string
    modal?: {
      general?: string
      keys?: Array<{
        title: string
        key: string
      }>
      advantages?: string[]
      useCases?: string[]
      benefits?: string[]
      integration?: string
      summary?: string
    }
  }
  [key: string]: unknown
}

export interface FacadesLocale {
  [key: string]: unknown
}

export interface AboutLocale {
  [key: string]: unknown
}

// Type for comprehensive locale data
export type LocaleData = {
  common: CommonLocale
  soft: SoftLocale
  facades: FacadesLocale
  about: AboutLocale
}

export type FullDictionary = Dictionary & {
  locale: LocaleData
}
