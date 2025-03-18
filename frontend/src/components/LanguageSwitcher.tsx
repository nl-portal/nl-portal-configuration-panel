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

import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useContext } from "react";
import MobileMenuButton from "./MobileMenuButton";

interface LanguageSwitcherProps {
  mobileMenu?: boolean;
}

const LanguageSwitcher = ({ mobileMenu }: LanguageSwitcherProps) => {
  const { currentLocale, setCurrentLocale, supportedLocales } =
    useContext(LocaleContext);
  const currentLocaleIndex = supportedLocales.findIndex(
    (locale) => locale === currentLocale,
  );
  const nextLocale =
    supportedLocales[currentLocaleIndex + 1] || supportedLocales[0];
  const onClick = () => setCurrentLocale(nextLocale);
  const message = <FormattedMessage id={`locales.${nextLocale}`} />;

  return !mobileMenu ? (
    <Button variant="secondary-action" onClick={onClick}>
      {message}
    </Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export default LanguageSwitcher;
