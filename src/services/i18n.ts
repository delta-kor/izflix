import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import commonEnglish from '../locales/en/common.json';
import commonKorean from '../locales/ko/common.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { common: commonEnglish },
      ko: { common: commonKorean },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
  });

export default i18n;
