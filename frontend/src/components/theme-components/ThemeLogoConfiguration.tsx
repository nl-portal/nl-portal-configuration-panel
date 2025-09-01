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
import {Fragment, useMemo} from "react";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {Heading3, Heading5} from "@gemeente-denhaag/typography";
import {FormattedMessage} from "react-intl";
import {ConfigurationForm} from "../ConfigurationForm.tsx";
import styles from "../ConfigurationForm.module.scss"
import useApplicationThemeLogosQuery from "../../hooks/useApplicationThemeLogosQuery.tsx";
import Skeleton from "react-loading-skeleton";
import {File} from "@gemeente-denhaag/file";
import {FormField} from "@gemeente-denhaag/form-field";
import useThemeLogo from "../../hooks/useThemeLogo.tsx";
import {Button} from "@gemeente-denhaag/button";
// import ConfigPanelSettingsContext from "../../contexts/ConfigPanelSettingsContext.tsx";

const ThemeLogoConfiguration = () => {
    // const {clientSettings} = useContext(ConfigPanelSettingsContext);
    const {
        data: themeLogos,
        isLoading: themeLogosLoading,
        isError: themeLogosError
    } = useApplicationThemeLogosQuery()
    const {downloadThemeLogo, uploadThemeLogo} = useThemeLogo()
    const currentLogos = useMemo(() => {
        return uploadThemeLogo.data ? [uploadThemeLogo.data] : themeLogos ? themeLogos : []
    }, [themeLogos, uploadThemeLogo.data])

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach((file) => uploadThemeLogo.mutate(file));
        }
    }

    // useEffect(() => {
    //     if (uploadThemeLogo.isSuccess && uploadThemeLogo.data) {
    //         toast(
    //             <Heading5>
    //                 <FormattedMessage
    //                     id={"api.upload.success"}
    //                     values={{item: uploadThemeLogo.data.filename}}
    //                 />
    //             </Heading5>
    //         )
    //     }
    // }, [currentLogos])

    if (themeLogosLoading) {
        return (
            <section>
                <Skeleton height={60}/>
            </section>
        );
    }

    if (themeLogosError)
        return (
            <section>
                <Heading3>
                    <FormattedMessage
                        id={"features.config.loading-error"}
                        values={{featureId: "logo"}}
                    />
                </Heading3>
            </section>
        );

    return (
        <ConfigurationForm className={styles["feature-config__form"]}
                           children={
                               <Fragment>
                                   <FormField
                                       label={
                                           <Heading3>
                                               <FormattedMessage id={"theme.logo.upload-new-logo"}/>
                                           </Heading3>
                                       }>
                                       <>
                                           <input
                                               id={"upload-theme-logo"}
                                               type={"file"}
                                               onChange={handleFileSelected}
                                               accept={"image/*"}
                                               multiple={false}
                                               disabled={uploadThemeLogo.isPending || themeLogosLoading}
                                               style={{display: "none"}}
                                           />
                                           <Button
                                               onClick={() => {
                                                   document.getElementById('upload-theme-logo')?.click()
                                               }}
                                           >
                                               <FormattedMessage id={"theme.logo.select-file"}/>
                                           </Button>
                                       </>
                                   </FormField>
                                   {currentLogos.length > 0 &&
                                       <Fieldset>
                                           <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                               <Heading3>
                                                   <FormattedMessage id={"theme.logo.current-logo"}/>
                                               </Heading3>
                                           </FieldsetLegend>
                                           {
                                               currentLogos?.map((logo, index) => (
                                                   <FormField
                                                       key={`logo-${index}`}
                                                       label={
                                                           <Heading5>
                                                               {`${logo.application || ''}${logo.profile ? " - " + logo.profile : ''}${logo.label ? " - " + logo.label : ''}`}
                                                           </Heading5>
                                                       }
                                                   >
                                                       <File
                                                           key={`logo-file-${index}`}
                                                           name={logo.filename}
                                                           href={logo.filename}
                                                           size={logo.size.toString()}
                                                           onClick={() => downloadThemeLogo.mutate(logo)}
                                                       />
                                                   </FormField>
                                               ))
                                           }
                                       </Fieldset>
                                   }
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default ThemeLogoConfiguration;
