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

import styles from "../../styles/Configuration.module.scss";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { Heading3, Heading4, Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";
import { FormField } from "@gemeente-denhaag/form-field";
import ActionField from "../ActionField.tsx";
import IconButton from "@gemeente-denhaag/iconbutton";
import { TrashIcon } from "@gemeente-denhaag/icons";
import { Editor } from "@monaco-editor/react";
import useThemeStyle from "../../hooks/useThemeStyle.tsx";
import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@gemeente-denhaag/button";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { useQueryClient } from "@tanstack/react-query";
import ConfigPanelSettingsContext from "../../contexts/ConfigPanelSettingsContext.tsx";

const ThemeStyleConfiguration = () => {
  const queryClient = useQueryClient();
  const { clientSettings } = useContext(ConfigPanelSettingsContext);
  const {
    getThemeStyles: {
      data: getThemeStylesData,
      isLoading: getThemeStylesLoading,
      isError: getThemeStylesError,
    },
    createThemeStyle: { mutate: createThemeStyle },
    updateThemeStyle: { data: updateThemeStylesData, mutate: updateThemeStyle },
    deleteThemeStyle: { mutate: deleteThemeStyle },
  } = useThemeStyle();
  const [dirtyStyles, setDirtyStyles] = useState<string | undefined>();
  const handleAddThemeStyle = (styles: string) => {
    createThemeStyle(styles, {
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: ["getThemeStyles"] });
      },
    });
  };
  const handleDeleteThemeStyle = (styleId: string) => {
    deleteThemeStyle(styleId, {
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: ["getThemeStyles"] });
      },
    });
  };
  const handleUpdateThemeStyle = (styleId: string, styles: string) => {
    console.log(`updating style with id ${styleId}:`, styles);
    updateThemeStyle({ styleId, styles });
    setDirtyStyles("");
  };

  if (getThemeStylesLoading)
    return (
      <div>
        <Skeleton height={60} />
      </div>
    );

  if (getThemeStylesError)
    return (
      <div className={styles["feature-config__content"]}>
        <Heading3>
          <FormattedMessage
            id={"features.config.loading-error"}
            values={{ featureId: "style" }}
          />
        </Heading3>
      </div>
    );

  return (
    <div className={styles["feature-config__content"]}>
      <ConfigurationForm
        className={styles["feature-config__form"]}
        children={
          <>
            {getThemeStylesData && getThemeStylesData.length < 1 && (
              <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                <Heading3>
                  <FormattedMessage id={"theme.style.no-existing-styles"} />
                </Heading3>
              </FieldsetLegend>
            )}
            {getThemeStylesData &&
              !getThemeStylesData.find(
                (style) => style.application === clientSettings.applicationName,
              ) && (
                <section
                  className={styles["form-field__section"]}
                  key={"add-theme-style-section"}
                >
                  <FormField
                    label={
                      <FormLabel>
                        <FormattedMessage
                          id={"theme.style.add-theme-style.label"}
                        />
                      </FormLabel>
                    }
                    description={
                      <Paragraph>
                        <FormattedMessage
                          id={"theme.style.add-theme-style.description"}
                        />
                      </Paragraph>
                    }
                  >
                    <div>
                      <Button
                        className={styles["feature-config__button"]}
                        onClick={() => handleAddThemeStyle("")}
                      >
                        <FormattedMessage id={"theme.style.add-another"} />
                      </Button>
                    </div>
                  </FormField>
                </section>
              )}
            {getThemeStylesData && getThemeStylesData.length > 0 && (
              <>
                <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                  <Heading3>
                    <FormattedMessage id={"theme.style.existing-styles"} />
                  </Heading3>
                  <Paragraph>
                    <FormattedMessage
                      id={"theme.style.existing-styles.description"}
                    />
                  </Paragraph>
                </FieldsetLegend>
                {getThemeStylesData?.map((themeStyle, index) => (
                  <section
                    className={styles["form-field__section"]}
                    key={"section-style-${index}"}
                  >
                    <FormField>
                      <ActionField
                        field={
                          <Heading3>
                            {`${themeStyle.application || ""}${themeStyle.profile ? " - " + themeStyle.profile : ""}${themeStyle.label ? " - " + themeStyle.label : ""}`}
                          </Heading3>
                        }
                        button={
                          <IconButton
                            type={"button"}
                            onClick={() =>
                              handleDeleteThemeStyle(themeStyle.styleId)
                            }
                          >
                            <TrashIcon></TrashIcon>
                          </IconButton>
                        }
                      />
                    </FormField>
                    <FormField
                      label={
                        <Heading4>
                          <FormattedMessage
                            id={"theme.style.stylesheet.label"}
                          />
                        </Heading4>
                      }
                      description={
                        <Paragraph>
                          <FormattedMessage
                            id={"theme.style.stylesheet.description"}
                            values={{
                              linkUrl: (chunks) => {
                                return (
                                  <a
                                    target="_blank"
                                    href="https://unpkg.com/@gemeente-denhaag/design-tokens-components/dist/index.css"
                                  >
                                    {chunks}
                                  </a>
                                );
                              },
                            }}
                          />
                        </Paragraph>
                      }
                      key={`style-${index}}`}
                    >
                      <Editor
                        value={
                          dirtyStyles ||
                          updateThemeStylesData?.styles ||
                          getThemeStylesData[0]?.styles
                        }
                        onChange={(value) => setDirtyStyles(value || "")}
                        height="25vh"
                        language={"css"}
                      />
                    </FormField>
                    <div className={styles["feature-config__buttons"]}>
                      <Button
                        className={styles["feature-config__button"]}
                        type={"button"}
                        disabled={!dirtyStyles}
                        onClick={() =>
                          handleUpdateThemeStyle(
                            themeStyle.styleId,
                            dirtyStyles!,
                          )
                        }
                      >
                        <FormattedMessage id={"action.save"}></FormattedMessage>
                      </Button>
                      <Button
                        variant="secondary-action"
                        className={styles["feature-config__button"]}
                        type={"button"}
                        onClick={() => {
                          setDirtyStyles(undefined);
                        }}
                        disabled={!dirtyStyles}
                      >
                        <FormattedMessage id={"action.reset"} />
                      </Button>
                    </div>
                  </section>
                ))}
              </>
            )}
          </>
        }
      ></ConfigurationForm>
    </div>
  );
};
export default ThemeStyleConfiguration;
