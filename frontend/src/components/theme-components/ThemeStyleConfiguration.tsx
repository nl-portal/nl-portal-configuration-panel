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

const ThemeStyleConfiguration = () => {
    // const queryClient = useQueryClient();
    // const {
    //     data: themeLogos,
    //     isLoading: themeLogosLoading,
    //     isError: themeLogosError,
    // } = useApplicationThemeLogosQuery()
    // const {getThemeLogoContent, uploadThemeLogo, deleteThemeLogo} = useThemeLogo()
    // const [currentLogos, setCurrentLogos] = useState<ThemeLogo[]>([])
    //
    // const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         Array.from(e.target.files).forEach((file) => uploadThemeLogo.mutate(file));
    //     }
    // }
    // const handleDelete = (themeLogoId: string) => {
    //     deleteThemeLogo.mutate(themeLogoId)
    // }
    //
    // useEffect(() => {
    //     if (themeLogos) {
    //         setCurrentLogos(themeLogos);
    //     }
    // }, [themeLogos])
    //
    // useEffect(() => {
    //     if (deleteThemeLogo.isSuccess || uploadThemeLogo.isSuccess) {
    //         void queryClient.invalidateQueries({queryKey: ["queryThemeLogos"]})
    //     }
    // }, [deleteThemeLogo.isSuccess, uploadThemeLogo.isSuccess])
    //
    // if (themeLogosLoading)
    //     return (
    //         <div>
    //             <Skeleton height={60}/>
    //         </div>
    //     );
    //
    // if (themeLogosError)
    //     return (
    //         <div className={styles["feature-config__content"]}>
    //             <Heading3>
    //                 <FormattedMessage
    //                     id={"features.config.loading-error"}
    //                     values={{featureId: "logo"}}
    //                 />
    //             </Heading3>
    //         </div>
    //     );
    //
    // return (
    //     <div className={styles["feature-config__content"]}>
    //         <ConfigurationForm className={styles["feature-config__form"]}
    //                            children={
    //                                <Fragment>
    //                                    <section
    //                                        className={styles["form-field__section"]}
    //                                        key={"add-another-section"}
    //                                    >
    //                                        <FormField
    //                                            label={
    //                                                <FormLabel>
    //                                                    <FormattedMessage id={"theme.logo.upload-theme-logo.label"}/>
    //                                                </FormLabel>
    //                                            }
    //                                            description={
    //                                                <Paragraph>
    //                                                    <FormattedMessage
    //                                                        id={"theme.logo.upload-theme-logo.description"}/>
    //                                                </Paragraph>
    //                                            }
    //                                        >
    //                                            <div className={styles[""]}>
    //                                                <input
    //                                                    id={"upload-theme-logo"}
    //                                                    type={"file"}
    //                                                    onChange={handleFileSelected}
    //                                                    accept={"image/*"}
    //                                                    multiple={false}
    //                                                    disabled={uploadThemeLogo.isPending || themeLogosLoading}
    //                                                    style={{display: "none"}}
    //                                                />
    //                                                <Button
    //                                                    className={styles["feature-config__button"]}
    //                                                    onClick={() => {
    //                                                        document.getElementById('upload-theme-logo')?.click()
    //                                                    }}
    //                                                >
    //                                                    <FormattedMessage id={"theme.logo.select-file"}/>
    //                                                </Button>
    //                                            </div>
    //                                        </FormField>
    //                                    </section>
    //                                    {currentLogos.length < 1 &&
    //                                        <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
    //                                            <Heading4>
    //                                                <FormattedMessage id={"theme.logo.no-existing-logos"}/>
    //                                            </Heading4>
    //                                        </FieldsetLegend>
    //                                    }
    //                                    {currentLogos.length > 0 &&
    //                                        <>
    //                                            <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
    //                                                <Heading4>
    //                                                    <FormattedMessage id={"theme.logo.existing-logos"}/>
    //                                                </Heading4>
    //                                            </FieldsetLegend>
    //                                            {
    //
    //                                                currentLogos?.map((logo, index) => (
    //                                                    <section
    //                                                        className={styles["form-field__section"]}
    //                                                        key={"section-logo-" + index}>
    //                                                        <FormField>
    //                                                            <ActionField
    //                                                                field={
    //                                                                    <Heading4>
    //                                                                        {`${logo.application || ''}${logo.profile ? " - " + logo.profile : ''}${logo.label ? " - " + logo.label : ''}`}
    //                                                                    </Heading4>}
    //                                                                button={
    //                                                                    <IconButton
    //                                                                        type={"button"}
    //                                                                        onClick={() => handleDelete(logo.logoId)}
    //                                                                    >
    //                                                                        <TrashIcon></TrashIcon>
    //                                                                    </IconButton>
    //                                                                }
    //                                                            />
    //                                                        </FormField>
    //                                                        <FormField
    //                                                            key={`logo-${index}`}
    //                                                        >
    //                                                            <File
    //                                                                key={`logo-file-${index}`}
    //                                                                name={logo.filename}
    //                                                                href={logo.filename}
    //                                                                size={logo.size.toString()}
    //                                                                onClick={() => getThemeLogoContent.mutate(logo)}
    //                                                                className={styles["form-field__denhaag_file"]}
    //                                                            />
    //                                                        </FormField>
    //
    //                                                    </section>
    //                                                ))
    //                                            }
    //                                        </>
    //                                    }
    //                                </Fragment>
    //                            }>
    //         </ConfigurationForm>
    //     </div>
    // )
    return <></>
}

export default ThemeStyleConfiguration;
