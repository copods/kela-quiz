import path from "path"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(
    new Backend(null, {
      loadPath: "/translations/{{lng}}.json",
    })
  )
  .init({
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: () => {
        // check the domain
        // const host = window.location.host;
        // return (host === 'production.ltd' ? '/static/app':'') + '/static/app/static/locales/{{lng}}/{{ns}}.json';
        return path.join(__dirname, "/app/translation/{{lng}}.json")
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
