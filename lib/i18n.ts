import * as lang from '@/locales/index';
import * as Localization from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ...lang.default
};

// Get device language
const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    const deviceLanguage = locales[0].languageCode;
    // Check if device language is supported, otherwise default to English
    return resources[deviceLanguage as keyof typeof resources] ? deviceLanguage : 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage() || 'en',
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: ['common'],
  });

export default i18n;
