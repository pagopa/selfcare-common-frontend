import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const labelTitle = 'nome Titolo';
const descriptionEn = 'bold description';
const descriptionIt = 'descrizione in grassetto';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'session modal button': 'Open Session Modal',
      labelTitle: 'name Title',
      boldDescriptionText: ' Test Description with bold text',
      boldDescriptionTwo: `view ${descriptionEn}`,
    },
  },
  it: {
    translation: {
      'session modal button': 'Apri Session Modal',
      labelTitle: `${labelTitle}`,
      boldDescriptionText: ' testo in grassetto',
      boldDescriptionTwo: `visualizza la ${descriptionIt}`,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'it', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
