import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Localization from 'expo-localization';

export type Lang = 'en' | 'ar';

function getDeviceDefaultLang(): Lang {
  const locales = Localization.getLocales();
  const primaryLocale = locales?.[0]?.languageCode ?? '';
  return primaryLocale.startsWith('ar') ? 'ar' : 'en';
}

interface LanguageContextValue {
  lang: Lang;
  isAR: boolean;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  isAR: false,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getDeviceDefaultLang);

  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, isAR: lang === 'ar', toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
