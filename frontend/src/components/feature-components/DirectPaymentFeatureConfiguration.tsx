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

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage, useIntl } from "react-intl";
import { Heading3, Heading4, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import { Select, SelectOption } from "@utrecht/component-library-react";
import { TextInput } from "@gemeente-denhaag/text-input";
import PasswordInput from "../PasswordInput.tsx";
import { IconButton } from "@gemeente-denhaag/iconbutton";
import { ArrowRightIcon, TrashIcon } from "@gemeente-denhaag/icons";
import _ from "lodash";
import ActionField from "../ActionField.tsx";
import { language, SHAOutParameter } from "../../constants/enums.ts";

interface DirectPaymentConfiguration {
  properties?: {
    url: string;
    "sha-out-parameters": SHAOutParameter[];
    "webhook-url": string;
    configurations: {
      [name: string]: DirectPaymentProfile;
    };
  };
}

interface DirectPaymentProfile {
  "psp-id": string;
  language: string;
  currency: string;
  "api-key": string;
  "api-secret": string;
  "return-url": string;
  "webhook-api-key": string;
  "webhook-api-secret": string;
}

interface OgonePaymentFeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: DirectPaymentConfiguration;
}

const DirectPaymentFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: OgonePaymentFeatureConfigurationProps) => {
  const intl = useIntl();
  const shaOutParameters = Object.values(SHAOutParameter);
  const [currentConfiguration, setCurrentConfiguration] = useState<
    DirectPaymentConfiguration | undefined
  >(prefillConfiguration);
  const paymentProfiles = useMemo(
    () => Object.keys(currentConfiguration?.properties?.configurations || {}),
    [currentConfiguration],
  );
  const {
    register,
    reset,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<DirectPaymentConfiguration>({
    defaultValues: {
      properties: {
        "sha-out-parameters": [],
        configurations: {},
      },
      ...prefillConfiguration,
    },
  });
  const languages = Object.values(language);
  const addProfileRef = useRef<HTMLInputElement>(null);
  const addProfile = (key: string) => {
    setCurrentConfiguration(
      _.set(
        { ...currentConfiguration },
        `properties.configurations.${key}`,
        {},
      ),
    );
  };
  const addAnotherValid = () => {
    return (
      (!!addProfileRef &&
        addProfileRef.current?.value.match(/^[0-9a-z/-]+$/) &&
        !paymentProfiles.find((key) => addProfileRef.current?.value === key)) ||
      false
    );
  };

  useEffect(() => {
    if (prefillConfiguration) {
      setCurrentConfiguration(prefillConfiguration);
      reset(prefillConfiguration);
    }
  }, [prefillConfiguration]);

  useEffect(() => {
    if (onChange && currentConfiguration) {
      onChange(currentConfiguration);
      reset(currentConfiguration);
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
                id={"features.payment.direct.configuration"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fragment>
            <FormField
              label={
                <FormLabel htmlFor={"url"}>
                  <FormattedMessage id={"features.payment.direct.url"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.payment.direct.url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput {...register("properties.url")} id="url" type="url" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"sha-out-parameters"}>
                  <FormattedMessage
                    id={"features.payment.direct.sha-out-parameters"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={
                      "features.payment.direct.sha-out-parameters.description"
                    }
                  />
                </Paragraph>
              }
            >
              <Select
                className={styles["form-field__select"]}
                {...register("properties.sha-out-parameters")}
                id="sha-out-parameters"
                multiple
              >
                {shaOutParameters.map((param) => (
                  <SelectOption key={param} value={param}>
                    {param}
                  </SelectOption>
                ))}
              </Select>
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"webhook-url"}>
                  <FormattedMessage
                    id={"features.payment.direct.webhook-url"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.payment.direct.webhook-url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.webhook-url")}
                id="webhook-url"
                type="url"
              />
            </FormField>
            {paymentProfiles.map((key, index) => (
              <section
                className={styles["form-field__section"]}
                key={key + "-" + index}
              >
                <FormField className={styles["form-field__section__header"]}>
                  <ActionField
                    field={
                      <Heading4>
                        {intl.formatMessage({
                          id: "features.payment.direct.profile",
                        }) +
                          ": " +
                          key}
                      </Heading4>
                    }
                    button={
                      <IconButton
                        onClick={() => {
                          setCurrentConfiguration(
                            _.omit(
                              getFormValue(),
                              `properties.configurations.${key}`,
                            ),
                          );
                        }}
                      >
                        <TrashIcon></TrashIcon>
                      </IconButton>
                    }
                  ></ActionField>
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={key + ".psp-id"}>
                      <FormattedMessage id={"features.payment.direct.psp-id"} />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.psp-id.description"}
                      />
                    </Paragraph>
                  }
                >
                  <TextInput
                    {...register(`properties.configurations.${key}.psp-id`)}
                    id={key + ".psp-id"}
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"language"}>
                      <FormattedMessage
                        id={"features.payment.direct.language"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.language.description"}
                      />
                    </Paragraph>
                  }
                >
                  <Select
                    className={styles["form-field__select"]}
                    {...register(`properties.configurations.${key}.language`)}
                    id="language"
                  >
                    {languages.map((lang) => (
                      <SelectOption key={lang} value={lang}>
                        <FormattedMessage
                          id={"i18n.language." + lang}
                        ></FormattedMessage>
                      </SelectOption>
                    ))}
                  </Select>
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"currency"}>
                      <FormattedMessage
                        id={"features.payment.direct.currency"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.currency.description"}
                      />
                    </Paragraph>
                  }
                >
                  <TextInput
                    {...register(`properties.configurations.${key}.currency`)}
                    id="currency"
                    maxLength={3}
                    onInput={(e) => {
                      // @ts-expect-error input event always has a value
                      e.target.value = e.target.value.toUpperCase();
                    }}
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"api-key"}>
                      <FormattedMessage
                        id={"features.payment.direct.api-key"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.api-key.description"}
                      />
                    </Paragraph>
                  }
                >
                  <PasswordInput
                    {...register(`properties.configurations.${key}.api-key`)}
                    id="api-key"
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"api-secret"}>
                      <FormattedMessage
                        id={"features.payment.direct.api-secret"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.api-secret.description"}
                      />
                    </Paragraph>
                  }
                >
                  <PasswordInput
                    {...register(`properties.configurations.${key}.api-secret`)}
                    id="api-secret"
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"return-url"}>
                      <FormattedMessage
                        id={"features.payment.direct.return-url"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={"features.payment.direct.return-url.description"}
                      />
                    </Paragraph>
                  }
                >
                  <TextInput
                    {...register(`properties.configurations.${key}.return-url`)}
                    id="return-url"
                    type="url"
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"webhook-api-key"}>
                      <FormattedMessage
                        id={"features.payment.direct.webhook-api-key"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={
                          "features.payment.direct.webhook-api-key.description"
                        }
                      />
                    </Paragraph>
                  }
                >
                  <TextInput
                    {...register(
                      `properties.configurations.${key}.webhook-api-key`,
                    )}
                    id="webhook-api-key"
                  />
                </FormField>
                <FormField
                  label={
                    <FormLabel htmlFor={"webhook-api-secret"}>
                      <FormattedMessage
                        id={"features.payment.direct.webhook-api-secret"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={
                          "features.payment.direct.webhook-api-secret.description"
                        }
                      />
                    </Paragraph>
                  }
                >
                  <PasswordInput
                    {...register(
                      `properties.configurations.${key}.webhook-api-secret`,
                    )}
                    id="webhook-api-secret"
                  />
                </FormField>
              </section>
            ))}
            <section
              className={styles["form-field__section"]}
              key={"add-another-section"}
            >
              <ActionField
                label={
                  <FormLabel htmlFor={"add-another"}>
                    <FormattedMessage
                      id={"features.payment.direct.profiles.add-another"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={
                        "features.payment.direct.profiles.add-another.description"
                      }
                    />
                  </Paragraph>
                }
                field={
                  <TextInput
                    id={"add-another"}
                    ref={addProfileRef}
                    placeholder={intl.formatMessage({
                      id: "features.payment.direct.profiles.profile-name",
                    })}
                  />
                }
                button={
                  <IconButton
                    onClick={() => {
                      if (addProfileRef.current) {
                        addProfile(addProfileRef.current.value);
                        addProfileRef.current.value = "";
                      }
                    }}
                    disabled={!addAnotherValid()}
                  >
                    <ArrowRightIcon></ArrowRightIcon>
                  </IconButton>
                }
              ></ActionField>
            </section>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default DirectPaymentFeatureConfiguration;
