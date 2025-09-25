import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import TextInput from "@gemeente-denhaag/text-input";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import PasswordInput from "../PasswordInput.tsx";
import { Select, SelectOption } from "@utrecht/component-library-react";

interface ZakenApiConfiguration {
  enabled?: string;
  properties?: {
    url?: string;
    "client-id"?: string;
    secret?: string;
    "zaak-types-ids-excluded"?: string[];
    "zaak-documenten-config"?: {
      "vertrouwelijkheidsaanduiding-whitelist"?: Vertrouwelijkheidsaanduiding[];
      "status-whitelist"?: DocumentStatus[];
    };
  };
}

enum Vertrouwelijkheidsaanduiding {
  openbaar = "openbaar",
  beperkt_openbaar = "beperkt_openbaar",
  intern = "intern",
  zaakvertrouwelijk = "zaakvertrouwelijk",
  vertrouwelijk = "vertrouwelijk",
  confidentieel = "confidentieel",
  geheim = "geheim",
  zeer_geheim = "zeer_geheim",
}

enum DocumentStatus {
  ter_vaststelling = "ter_vaststelling",
  in_bewerking = "in_bewerking",
  definitief = "definitief",
  gearchiveerd = "gearchiveerd",
}

interface ZakenApiFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: ZakenApiConfiguration;
}

const ZakenApiFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: ZakenApiFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<ZakenApiConfiguration>(prefillConfiguration || {});
  const documentStatussen = Object.values(DocumentStatus);
  const documentVertrouwelijkheidsaanduidingen = Object.values(
    Vertrouwelijkheidsaanduiding,
  );
  const {
    register,
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<ZakenApiConfiguration>({
    defaultValues: {
      enabled: "false",
      properties: {
        "zaak-documenten-config": {
          "status-whitelist": [],
          "vertrouwelijkheidsaanduiding-whitelist": [],
        },
      },
      ...prefillConfiguration,
    },
  });

  useEffect(() => {
    if (prefillConfiguration) {
      reset(prefillConfiguration);
    }
  }, [prefillConfiguration]);

  useEffect(() => {
    if (
      onChange &&
      currentConfiguration &&
      formState.isDirty &&
      formState.isValid
    ) {
      onChange(currentConfiguration);
    }
  }, [currentConfiguration]);

  return (
    <ConfigurationForm
      className={styles["feature-config__form"]}
      onChange={() => {
        setCurrentConfiguration(getFormValue());
      }}
      onSubmit={handleSubmit(() => onSubmit)}
      children={
        <Fragment>
          <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
            <Heading3>
              <FormattedMessage
                id={"features.zakenapi.configuration"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fieldset role={"radiogroup"}>
            <FormField
              className={styles["form-field__radio-option"]}
              type="radio"
              label={
                <FormLabel htmlFor={"enabled.true"}>
                  <FormattedMessage
                    id={"features.feature.enabled.true"}
                  ></FormattedMessage>
                </FormLabel>
              }
            >
              <RadioButton
                {...register("enabled")}
                className="utrecht-form-field__input"
                id={"enabled.true"}
                value={"true"}
              />
            </FormField>
            <FormField
              className={styles["form-field__radio-option"]}
              type="radio"
              label={
                <FormLabel htmlFor={"enabled.false"}>
                  <FormattedMessage
                    id={"features.feature.enabled.false"}
                  ></FormattedMessage>
                </FormLabel>
              }
            >
              <RadioButton
                {...register("enabled")}
                className="utrecht-form-field__input"
                id={"enabled.false"}
                value={"false"}
              />
            </FormField>
          </Fieldset>
          {watch("enabled") === "true" && (
            <Fragment>
              <FormField
                label={
                  <FormLabel htmlFor={"url"}>
                    <FormattedMessage id={"features.zakenapi.url"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.zakenapi.url.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.url")}
                  id="url"
                  type="url"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"client-id"}>
                    <FormattedMessage id={"features.zakenapi.client-id"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.zakenapi.client-id.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.client-id")}
                  id="client-id"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"secret"}>
                    <FormattedMessage id={"features.zakenapi.secret"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.zakenapi.secret.description"}
                    />
                  </Paragraph>
                }
              >
                <PasswordInput {...register("properties.secret")} id="secret" />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"zaak-types-ids-excluded"}>
                    <FormattedMessage
                      id={"features.zakenapi.zaak-types-ids-excluded"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={
                        "features.zakenapi.zaak-types-ids-excluded.description"
                      }
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.zaak-types-ids-excluded")}
                  id="zaak-types-ids-excluded"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"vertrouwelijkheidsaanduiding-whitelist"}>
                    <FormattedMessage
                      id={
                        "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist"
                      }
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={
                        "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist.description"
                      }
                    />
                  </Paragraph>
                }
              >
                <Select
                  className={styles["form-field__select"]}
                  {...register(
                    "properties.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist",
                  )}
                  id="vertrouwelijkheidsaanduiding-whitelist"
                  multiple
                >
                  {documentVertrouwelijkheidsaanduidingen.map((aanduiding) => (
                    <SelectOption key={aanduiding} value={aanduiding}>
                      <FormattedMessage
                        id={
                          "zaakdocument.vertrouwelijkheidsaanduiding." +
                          aanduiding
                        }
                      ></FormattedMessage>
                    </SelectOption>
                  ))}
                </Select>
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"status-whitelist"}>
                    <FormattedMessage
                      id={
                        "features.zakenapi.zaak-documenten-config.status-whitelist"
                      }
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={
                        "features.zakenapi.zaak-documenten-config.status-whitelist.description"
                      }
                    />
                  </Paragraph>
                }
              >
                <Select
                  className={styles["form-field__select"]}
                  {...register(
                    "properties.zaak-documenten-config.status-whitelist",
                  )}
                  id="status-whitelist"
                  multiple
                >
                  {documentStatussen.map((status) => (
                    <SelectOption key={status} value={status}>
                      <FormattedMessage
                        id={"zaakdocument.status." + status}
                      ></FormattedMessage>
                    </SelectOption>
                  ))}
                </Select>
              </FormField>
            </Fragment>
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default ZakenApiFeatureConfiguration;
