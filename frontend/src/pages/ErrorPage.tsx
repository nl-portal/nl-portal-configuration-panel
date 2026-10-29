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

import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { PageHeader } from "@gemeente-denhaag/page";
import { Heading2, Paragraph } from "@gemeente-denhaag/typography";
import PageGrid from "../components/PageGrid.tsx";

const ErrorPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "unexpectedError.title" });

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <PageGrid>
      <PageHeader>
        <Heading2>{title}</Heading2>
      </PageHeader>
      <FormattedMessage
        id="unexpectedError.description"
        values={{ p: (chunks) => <Paragraph>{chunks}</Paragraph> }}
      />
    </PageGrid>
  );
};

export default ErrorPage;
