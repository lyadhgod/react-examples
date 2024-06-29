import 'server-only'
 
const dictionaries = {
  "en-US": () => import('./dictionaries/en-US.json')
    .then((module) => module.default),
  "en-DK": () => import('./dictionaries/en-US.json')
    .then((module) => module.default),
}

type Locale = keyof typeof dictionaries

export const locales = Object.keys(dictionaries) as Locale[]

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
