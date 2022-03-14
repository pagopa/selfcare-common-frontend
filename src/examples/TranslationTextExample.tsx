import { initReactI18next, Trans } from 'react-i18next';
// import { Link } from 'react-router-dom';
import i18n from 'i18next';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          nameTitle: 'Elena',
        },
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default function TranslationTextExample() {
  const person = { name: 'Henry', age: 21 };
  const { name } = person;
  const messages = ['message one', 'message two'];

  // const { t } = useTranslation('myNamespace');
  return (
    <>
      <Trans>Hello {{ firstname: person.name }}.</Trans>
      <Trans>Hello {{ name }}</Trans>
      <Trans i18nKey="newMessages" count={messages.length}>
        You got {{ count: messages.length }} messages.
      </Trans>
    </>
  );
}
