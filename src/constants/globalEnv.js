 const globalEnv = {
  ...{
    backUrl: import.meta.env.VITE_APP_BACK_URL,
    i18nLocale: import.meta.env.VITE_APP_I18N_LOCALE,
  },
};


export default globalEnv;