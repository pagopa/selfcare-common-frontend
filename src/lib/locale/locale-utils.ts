import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import it from './it';

export const configureI18n = (
  resources: { [lang: string]: any },
  defaultLanguage: string = 'it'
) => {
  const completeResources = { ...resources, it: { translation: { ...it, ...resources.it } } };
  i18n
    .use(initReactI18next)
    .init({
      resources: completeResources,
      lng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
};
