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
      description: {
        part1: 'eng: description test-part1',
        part2: 'eng: description test-part2',
      },
      key: '{{what}} {{and}} {{how}}!!',
      key2: 'I am <1>{{author}}</1> not bold',
      nesting1: '1 $t(nesting2)',
      nesting2: '2 $t(nesting3)',
      nesting3: '3',
      arrayJoinWithInterpolation: ['you', 'can', '{{myVar}}'],
      arrayOfObjects: [{ name: 'tom' }, { name: 'steve' }],
    },
  },
  it: {
    translation: {
      'session modal button': 'Apri Session Modal',
      labelTitle: `${labelTitle}`,
      boldDescriptionText: ' testo in grassetto',
      boldDescriptionTwo: `visualizza la ${descriptionIt}`,
      description: {
        part1: 'ita: descrizione test-parte1',
        part2: 'ita: descrizione test-parte2',
      },
      key: '{{what}} {{e}} {{how}}!!',
      key2: 'sono <1>{{author}}</1> non in grassetto',
      nesting1: '1 $t(nesting2)',
      nesting2: '2 $t(nesting3)',
      nesting3: '3',
      arrayJoinWithInterpolation: ['tu', 'puoi', '{{myVar}}'],
      arrayOfObjects: [{ name: 'tom' }, { name: ' steve' }],
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'it', // en it / language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
