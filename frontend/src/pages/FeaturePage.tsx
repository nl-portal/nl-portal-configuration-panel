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

import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { Alert } from "@gemeente-denhaag/alert";
import { Button } from "@gemeente-denhaag/button";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { PageHeader } from "@gemeente-denhaag/page";
import {
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
} from "@gemeente-denhaag/typography";
import { FormToggle } from "@utrecht/component-library-react";
import { paths } from "../constants/paths";
import { editableSections, moduleSections } from "../constants/sections.tsx";
import {
  ConfigSectionKind,
  EditableSection,
  ModuleFeatureSection,
  sectionFieldGroups,
  sectionTitle,
  sectionIoPrefixes,
  sectionRootPrefix,
} from "../interfaces/ConfigSection.ts";
import useConfigurationPropertyMapper from "../hooks/useConfigurationPropertyMapperHook.tsx";
import useConfiguration from "../hooks/useConfiguration.tsx";
import useFeatureToggle, {
  useFeatureToggleQueryOptions,
} from "../hooks/useFeatureToggle.tsx";
import PageGrid from "../components/PageGrid.tsx";
import BackLink from "../components/BackLink.tsx";
import SectionRenderer from "../components/SectionRenderer.tsx";
import { fieldsValid } from "../components/config-fields/fieldValues.ts";
import styles from "../styles/Configuration.module.scss";

const notify = (messageId: string) =>
  toast(() => (
    <Heading4>
      <FormattedMessage id={messageId} />
    </Heading4>
  ));

/** Lists the required sections that are off. Never blocks editing. */
const PrerequisiteWarning = ({
  section,
}: {
  section: ModuleFeatureSection;
}) => {
  const intl = useIntl();
  const toggleQuery = useFeatureToggleQueryOptions();
  const required = moduleSections.filter((it) =>
    section.requires?.includes(it.id),
  );
  const toggles = useQueries({
    queries: required.map((it) => toggleQuery(it.prefix)),
  });
  const disabled = required.filter(
    (_it, index) => toggles[index].data && !toggles[index].data.enabled,
  );

  if (disabled.length === 0) return null;

  return (
    <Alert
      variant="warning"
      title={intl.formatMessage({ id: "features.feature.requires.title" })}
      text={
        <Paragraph>
          <FormattedMessage
            id="features.feature.requires"
            values={{
              sections: disabled.map((it) => it.title).join(", "),
            }}
          />
        </Paragraph>
      }
    />
  );
};

const FeatureToggleBlock = ({ section }: { section: ModuleFeatureSection }) => {
  const {
    getFeatureToggle: { data: featureToggle },
    setFeatureToggle,
  } = useFeatureToggle({ featurePrefix: section.prefix, hasToggle: true });

  if (!featureToggle) return <Skeleton height={60} />;

  const checked = setFeatureToggle.isPending
    ? setFeatureToggle.variables
    : featureToggle.enabled;

  return (
    <>
      <FormField
        label={
          <FormLabel htmlFor="feature-toggle">
            <FormattedMessage id="features.feature.enabled" />
          </FormLabel>
        }
        description={
          <Paragraph>
            <FormattedMessage id="features.feature.enabled.description" />
          </Paragraph>
        }
      >
        <FormToggle
          id="feature-toggle"
          className={styles["form-field__toggle"]}
          checked={checked}
          disabled={setFeatureToggle.isPending}
          onChange={(e) =>
            setFeatureToggle.mutate(e.currentTarget.checked, {
              onSuccess: () => notify("api.save.success"),
              onError: () => notify("api.error"),
            })
          }
        />
      </FormField>
      {section.requires && <PrerequisiteWarning section={section} />}
    </>
  );
};

const SectionPage = ({ section }: { section: EditableSection }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { parseProperties, toProperties } = useConfigurationPropertyMapper();
  const ioPrefixes = sectionIoPrefixes(section);
  const rootPrefix = sectionRootPrefix(section);
  const {
    getConfigurations: { data: rows, isPending, isError },
    storeConfigurations,
    deleteConfigurations,
  } = useConfiguration({ featurePrefixes: ioPrefixes });
  const loaded = useMemo(
    () => (rows ? (parseProperties(rows, rootPrefix) ?? {}) : undefined),
    [rows, rootPrefix],
  );
  const [draft, setDraft] = useState<object | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const values = draft ?? loaded ?? {};
  const isDirty = draft !== undefined && !_.isEqual(draft, loaded);
  const isValid = sectionFieldGroups(section).every((group) =>
    fieldsValid(group.fields, values),
  );

  const handleChange = (path: string, value: unknown) =>
    setDraft((previous) => {
      const next = _.cloneDeep(previous ?? loaded ?? {});
      _.set(next, path, value);
      return next;
    });

  const handleSubmit = async () => {
    // Nothing was edited, so there is nothing to replace.
    if (_.isEmpty(draft) || !isValid) return;

    const properties = toProperties(draft, rootPrefix);
    setIsSaving(true);
    try {
      for (const prefix of ioPrefixes) {
        await deleteConfigurations.mutateAsync(prefix);
        const owned = properties.filter((it) =>
          it.propertyKey.startsWith(`${prefix}.`),
        );
        if (owned.length > 0) await storeConfigurations.mutateAsync(owned);
      }
      await queryClient.invalidateQueries({ queryKey: ["getConfigurations"] });
      setDraft(undefined);
      notify("api.save.success");
    } catch {
      // The draft stays, so the form remains dirty and can be saved again.
      notify("api.error");
    } finally {
      setIsSaving(false);
    }
  };

  const backLink = (
    <BackLink
      href={paths.configuration}
      children={
        <Heading4>
          <FormattedMessage id="action.back" />
        </Heading4>
      }
    />
  );

  if (isPending) {
    return (
      <section>
        <Skeleton height={60} />
      </section>
    );
  }

  if (isError)
    return (
      <>
        {backLink}
        <div className={styles["feature-config__content"]}>
          <Heading3>
            <FormattedMessage
              id="features.config.loading-error"
              values={{
                featureId: sectionTitle(intl, section),
              }}
            />
          </Heading3>
        </div>
      </>
    );

  return (
    <PageGrid>
      <PageHeader>
        {backLink}
        <div className={styles["feature-config__header"]}>
          <Heading2>{sectionTitle(intl, section)}</Heading2>
        </div>
      </PageHeader>
      {section.kind === ConfigSectionKind.MODULE_FEATURE &&
        (section.deprecated || section.enableToggle) && (
          <div className={styles["feature-config__content"]}>
            <div className={styles["feature-config__form"]}>
              {section.deprecated && (
                <Alert
                  variant="warning"
                  title={intl.formatMessage({
                    id: "features.deprecated.title",
                  })}
                  text={
                    <Paragraph>
                      <FormattedMessage
                        id={
                          section.deprecatedDescriptionId ??
                          "features.deprecated.description"
                        }
                      />
                    </Paragraph>
                  }
                />
              )}
              {section.enableToggle && (
                <>
                  <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                    <Heading3>
                      <FormattedMessage id="features.feature.configuration" />
                    </Heading3>
                  </FieldsetLegend>
                  <FeatureToggleBlock section={section} />
                </>
              )}
            </div>
          </div>
        )}
      <div className={styles["feature-config__content"]}>
        <SectionRenderer
          section={section}
          values={values}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className={styles["feature-config__buttons"]}>
          <Button
            className={styles["feature-config__button"]}
            onClick={() => void handleSubmit()}
            disabled={!isDirty || !isValid || isSaving}
            type="button"
          >
            <FormattedMessage id="action.save" />
          </Button>
          <Button
            variant="secondary-action"
            className={styles["feature-config__button"]}
            onClick={() => navigate(paths.configuration)}
          >
            <FormattedMessage id={isDirty ? "action.cancel" : "action.back"} />
          </Button>
        </div>
      </div>
    </PageGrid>
  );
};

const FeaturePage = () => {
  const { featureId } = useParams();
  const section = editableSections.find((it) => it.id === featureId);

  if (!section) return <Navigate to={paths.configuration} replace />;

  return <SectionPage key={section.id} section={section} />;
};

export default FeaturePage;
