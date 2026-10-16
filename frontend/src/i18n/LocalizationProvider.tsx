/*
 * Copyright 2025 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Ported from NL Portal 3.x `frontend/packages/localization/src/providers/LocalizationProvider.tsx`.

import { ReactNode, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import LocaleContext from "./LocaleContext.tsx";
import { DEFAULT_LOCALES, Locales, Messages } from "./locales.ts";

const LOCAL_STORAGE_LANG_KEY = "NL_PORTAL_LANG";

const readSavedLocale = (): string | null => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
  } catch {
    return null;
  }
};

interface Props {
  children: ReactNode;
  messages: Messages;
  locales?: Locales;
}

const LocalizationProvider = ({
  children,
  messages,
  locales = DEFAULT_LOCALES,
}: Props) => {
  const supportedLocales = Object.values(locales);
  const [currentLocale, setCurrentLocale] = useState(() => {
    const savedLocale = readSavedLocale();
    return savedLocale && supportedLocales.includes(savedLocale)
      ? savedLocale
      : supportedLocales[0];
  });
  const hrefLang = currentLocale.toLocaleLowerCase().split("-")[0];

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, currentLocale);
    } catch {
      // storage unavailable; the locale then only lasts for this session
    }
    document.documentElement.lang = hrefLang;
  }, [currentLocale, hrefLang]);

  return (
    <LocaleContext.Provider
      value={{ currentLocale, supportedLocales, setCurrentLocale, hrefLang }}
    >
      <IntlProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
        onError={(error) => {
          if (error.code === "MISSING_TRANSLATION") {
            console.warn("Missing translation", error.message);
            return;
          }
          throw error;
        }}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocalizationProvider;
