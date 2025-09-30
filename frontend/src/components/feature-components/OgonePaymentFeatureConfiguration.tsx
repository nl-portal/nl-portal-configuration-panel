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
import { Fieldset, FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage, useIntl } from "react-intl";
import { Heading3, Heading4, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import { RadioButton } from "@gemeente-denhaag/radio-button";
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

interface OgonePaymentConfiguration {
  enabled?: string;
  properties?: {
    url: string;
    "sha-out-parameters": SHAOutParameter[];
    configurations: {
      [name: string]: OgonePaymentProfile;
    };
  };
}

interface OgonePaymentProfile {
  "psp-id": string;
  language: string;
  currency: string;
  title: string;
  "sha-in-key": string;
  "sha-out-key": string;
  "sha-version": string;
  "failure-url": string;
  "success-url": string;
}

interface OgonePaymentFeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: OgonePaymentConfiguration;
}

const OgonePaymentFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: OgonePaymentFeatureConfigurationProps) => {
  const intl = useIntl();
  const shaOutParameters = Object.values(SHAOutParameter);
  const [currentConfiguration, setCurrentConfiguration] = useState<
    OgonePaymentConfiguration | undefined
  >(prefillConfiguration);
  const paymentProfiles = useMemo(
    () => Object.keys(currentConfiguration?.properties?.configurations || {}),
    [currentConfiguration],
  );
  const {
    register,
    watch,
    reset,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<OgonePaymentConfiguration>({
    defaultValues: {
      enabled: "false",
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
                id={"features.payment.ogone.configuration"}
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
                    <FormattedMessage id={"features.payment.ogone.url"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.payment.ogone.url.description"}
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
                  <FormLabel htmlFor={"sha-out-parameters"}>
                    <FormattedMessage
                      id={"features.payment.ogone.sha-out-parameters"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={
                        "features.payment.ogone.sha-out-parameters.description"
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
                            id: "features.payment.ogone.profile",
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
                      <FormLabel htmlFor={key + ".title"}>
                        <FormattedMessage id={"features.payment.ogone.title"} />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.title.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <TextInput
                      {...register(`properties.configurations.${key}.title`)}
                      id={key + ".title"}
                    />
                  </FormField>
                  <FormField
                    label={
                      <FormLabel htmlFor={key + ".psp-id"}>
                        <FormattedMessage
                          id={"features.payment.ogone.psp-id"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.psp-id.description"}
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
                          id={"features.payment.ogone.language"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.language.description"}
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
                      <FormLabel htmlFor={key + ".sha-in-key"}>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-in-key"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-in-key.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <PasswordInput
                      {...register(
                        `properties.configurations.${key}.sha-in-key`,
                      )}
                      id={key + ".sha-in-key"}
                    />
                  </FormField>
                  <FormField
                    label={
                      <FormLabel htmlFor={key + ".sha-out-key"}>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-out-key"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-out-key.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <PasswordInput
                      {...register(
                        `properties.configurations.${key}.sha-out-key`,
                      )}
                      id={key + ".sha-out-key"}
                    />
                  </FormField>
                  <FormField
                    label={
                      <FormLabel htmlFor={"sha-version"}>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-version"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.sha-version.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <Select
                      className={styles["form-field__select"]}
                      {...register(
                        `properties.configurations.${key}.sha-version`,
                      )}
                      id="sha-version"
                    >
                      <SelectOption key={"SHA1"} value={"SHA1"}>
                        SHA1
                      </SelectOption>
                      <SelectOption key={"SHA256"} value={"SHA256"}>
                        SHA256
                      </SelectOption>
                      <SelectOption key={"SHA512"} value={"SHA512"}>
                        SHA512
                      </SelectOption>
                    </Select>
                  </FormField>
                  <FormField
                    label={
                      <FormLabel htmlFor={"failure-url"}>
                        <FormattedMessage
                          id={"features.payment.ogone.failure-url"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.failure-url.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <TextInput
                      {...register(
                        `properties.configurations.${key}.failure-url`,
                      )}
                      id="url"
                      type="url"
                    />
                  </FormField>
                  <FormField
                    label={
                      <FormLabel htmlFor={"success-url"}>
                        <FormattedMessage
                          id={"features.payment.ogone.success-url"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"features.payment.ogone.success-url.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <TextInput
                      {...register(
                        `properties.configurations.${key}.success-url`,
                      )}
                      id="url"
                      type="url"
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
                        id={"features.payment.ogone.profiles.add-another"}
                      />
                    </FormLabel>
                  }
                  description={
                    <Paragraph>
                      <FormattedMessage
                        id={
                          "features.payment.ogone.profiles.add-another.description"
                        }
                      />
                    </Paragraph>
                  }
                  field={
                    <TextInput
                      id={"add-another"}
                      ref={addProfileRef}
                      placeholder={intl.formatMessage({
                        id: "features.payment.ogone.profiles.profile-name",
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
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default OgonePaymentFeatureConfiguration;
