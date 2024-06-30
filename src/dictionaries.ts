import 'server-only'
 
const dictionaries = {
  "en-US": {
    name: 'English (United States)',
    dict: () => import('./dictionaries/en-US.json').then(d => d.default as Readonly<typeof d.default>)
  }
}

type Locale = keyof typeof dictionaries

export const locales = Object.keys(dictionaries) as Readonly<Locale[]>

export const localeNames = locales.map(locale => dictionaries[locale].name) as Readonly<string[]>

export async function getDictionary(locale: Locale) {
  return dictionaries[locale].dict()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
