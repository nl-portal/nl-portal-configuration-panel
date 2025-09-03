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

import {useContext} from "react";
import {useAuth} from "react-oidc-context";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import useSaveFile from "./useSaveFile.tsx";
import {toast} from "react-toastify";
import {Heading4} from "@gemeente-denhaag/typography";
import {FormattedMessage} from "react-intl";

export type ThemeLogo = {
    logoId: string;
    filename: string;
    size: number;
    contentType: string;
    application: string;
    profile?: string;
    label?: string;
}

const useThemeLogo = () => {
    const auth = useAuth();
    const saveFile = useSaveFile();
    const {configPanelSettings, clientSettings} = useContext(ConfigPanelSettingsContext);
    const getThemeLogos = async (): Promise<ThemeLogo[]> => {
        const response = await fetch(
            `${configPanelSettings.restApiUrl}/v1/theme/${clientSettings.applicationName}/logo`,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + auth.user?.access_token,
                }
            }
        )
        return await response.json();
    }
    const getThemeLogoContent = async (themeLogo: ThemeLogo) => {
        const response = await fetch(
            `${configPanelSettings.restApiUrl}/v1/theme/${clientSettings.applicationName}/logo/${themeLogo.logoId}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + auth.user?.access_token,
                }
            }
        )
        const data = await response.blob();
        const blob = data.slice(0, data.size, themeLogo.contentType);

        saveFile(blob, themeLogo.filename);
    }
    const deleteThemeLogo = async (themeLogoId: string) => {
        await fetch(
            `${configPanelSettings.restApiUrl}/v1/theme/${clientSettings.applicationName}/logo/${themeLogoId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + auth.user?.access_token,
                }
            }
        );
    }
    const uploadFile = async (file: File): Promise<ThemeLogo> => {
        const uploadLink = `${configPanelSettings.restApiUrl}/v1/theme/${clientSettings.applicationName}/logo`;
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(uploadLink, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${auth.user?.access_token}`,
            },
            body: formData,
        })
        return await response.json()
    };

    return {
        getThemeLogos: useQuery({
            queryKey: ['getThemeLogos',],
            queryFn: getThemeLogos,
        }),
        getThemeLogoContent: useMutation({
            mutationKey: ['getThemeLogoContent',],
            mutationFn: getThemeLogoContent
        }),
        uploadThemeLogo: useMutation({
            mutationKey: ['uploadThemeLogo',],
            mutationFn: uploadFile,
            onSuccess: () => {
                void toast(() =>
                    <Heading4>
                        <FormattedMessage id={"api.upload.success"}/>
                    </Heading4>
                )
            },
            onError: () => {
                void toast(() =>
                    <Heading4>
                        <FormattedMessage id={"api.upload.error"}/>
                    </Heading4>
                )
            },

        }),
        deleteThemeLogo: useMutation({
            mutationKey: ['deleteThemeLogo',],
            mutationFn: deleteThemeLogo,
            onSuccess: () => {
                void toast(() =>
                    <Heading4>
                        <FormattedMessage id={"api.save.success"}/>
                    </Heading4>
                )
            },
            onError: () => {
                void toast(() =>
                    <Heading4>
                        <FormattedMessage id={"api.error"}/>
                    </Heading4>
                )
            },
        })
    }
}

export default useThemeLogo;
