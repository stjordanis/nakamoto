import I18n, { getLanguages } from 'react-native-i18n'
import en from './locales/en'
import fr from './locales/fr'

I18n.fallbacks = true

I18n.translations = {
  en,
  fr
}

const userLanguage = () => {
  getLanguages().then(languages => {
    return languages[0]
  })
}

export { I18n, userLanguage }
