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
import React, {Fragment, useEffect, useState} from "react";
import {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {Heading3, Heading4, Paragraph} from "@gemeente-denhaag/typography";
import {FormattedMessage} from "react-intl";
import {ConfigurationForm} from "../ConfigurationForm.tsx";
import Skeleton from "react-loading-skeleton";
import {File} from "@gemeente-denhaag/file";
import {FormField} from "@gemeente-denhaag/form-field";
import useThemeLogo, {ThemeLogo} from "../../hooks/useThemeLogo.tsx";
import {Button} from "@gemeente-denhaag/button";
import ActionField from "../ActionField.tsx";
import {TrashIcon} from "@gemeente-denhaag/icons";
import styles from "../../styles/Configuration.module.scss"
import IconButton from "@gemeente-denhaag/iconbutton";
import {useQueryClient} from "@tanstack/react-query";
import {FormLabel} from "@gemeente-denhaag/form-label";
import useUtil from "../../hooks/useUtil.tsx";

const ThemeLogoConfiguration = () => {
    const queryClient = useQueryClient();
    const {formatBytes} = useUtil();
    const {
        getThemeLogos: {data: themeLogos, isLoading: themeLogosLoading, isError: themeLogosError},
        getThemeLogoContent,
        uploadThemeLogo,
        deleteThemeLogo
    } = useThemeLogo()
    const [currentLogos, setCurrentLogos] = useState<ThemeLogo[]>([])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach((file) => {
                    uploadThemeLogo.mutate(file, {
                            onSettled: () => {
                                e.target.value = '';
                                void queryClient.invalidateQueries({queryKey: ["getThemeLogos"]})
                            }
                        }
                    )
                }
            )
        }
    }
    const handleDelete = (themeLogoId: string) => {
        deleteThemeLogo.mutate(themeLogoId, {
                onSettled: () => {
                    void queryClient.invalidateQueries({queryKey: ["getThemeLogos"]})
                }
            }
        )
    }

    useEffect(() => {
        if (themeLogos) {
            setCurrentLogos(themeLogos);
        }
    }, [themeLogos])

    if (themeLogosLoading)
        return (
            <div>
                <Skeleton height={60}/>
            </div>
        );

    if (themeLogosError)
        return (
            <div className={styles["feature-config__content"]}>
                <Heading3>
                    <FormattedMessage
                        id={"features.config.loading-error"}
                        values={{featureId: "logo"}}
                    />
                </Heading3>
            </div>
        );

    return (
        <div className={styles["feature-config__content"]}>
            <ConfigurationForm className={styles["feature-config__form"]}
                               children={
                                   <Fragment>
                                       <section
                                           className={styles["form-field__section"]}
                                           key={"add-another-section"}
                                       >
                                           <FormField
                                               label={
                                                   <FormLabel>
                                                       <FormattedMessage id={"theme.logo.upload-theme-logo.label"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"theme.logo.upload-theme-logo.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <div className={styles[""]}>
                                                   <input
                                                       id={"upload-theme-logo"}
                                                       type={"file"}
                                                       onChange={handleFileUpload}
                                                       accept={"image/*"}
                                                       multiple={false}
                                                       disabled={uploadThemeLogo.isPending}
                                                       style={{display: "none"}}
                                                   />
                                                   <Button
                                                       className={styles["feature-config__button"]}
                                                       onClick={() => {
                                                           document.getElementById('upload-theme-logo')?.click()
                                                       }}
                                                   >
                                                       <FormattedMessage id={"theme.logo.select-file"}/>
                                                   </Button>
                                               </div>
                                           </FormField>
                                       </section>
                                       {currentLogos.length < 1 &&
                                           <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                               <Heading4>
                                                   <FormattedMessage id={"theme.logo.no-existing-logos"}/>
                                               </Heading4>
                                           </FieldsetLegend>
                                       }
                                       {currentLogos.length > 0 &&
                                           <>
                                               <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                                   <Heading4>
                                                       <FormattedMessage id={"theme.logo.existing-logos"}/>
                                                   </Heading4>
                                               </FieldsetLegend>
                                               {

                                                   currentLogos?.map((logo, index) => (
                                                       <section
                                                           className={styles["form-field__section"]}
                                                           key={"section-logo-" + index}>
                                                           <FormField>
                                                               <ActionField
                                                                   field={
                                                                       <Heading4>
                                                                           {`${logo.application || ''}${logo.profile ? " - " + logo.profile : ''}${logo.label ? " - " + logo.label : ''}`}
                                                                       </Heading4>}
                                                                   button={
                                                                       <IconButton
                                                                           type={"button"}
                                                                           onClick={() => handleDelete(logo.logoId)}
                                                                       >
                                                                           <TrashIcon></TrashIcon>
                                                                       </IconButton>
                                                                   }
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               key={`logo-${index}`}
                                                           >
                                                               <File
                                                                   name={logo.filename.substring(0, logo.filename.lastIndexOf('.'))}
                                                                   href={logo.filename}
                                                                   size={formatBytes(logo.size, 2)}
                                                                   onClick={(e) => {
                                                                       e.preventDefault()
                                                                       getThemeLogoContent.mutate(logo)
                                                                   }}
                                                                   className={styles["form-field__denhaag_file"]}
                                                               />
                                                           </FormField>

                                                       </section>
                                                   ))
                                               }
                                           </>
                                       }
                                   </Fragment>
                               }>
            </ConfigurationForm>
        </div>
    )
}

export default ThemeLogoConfiguration;
