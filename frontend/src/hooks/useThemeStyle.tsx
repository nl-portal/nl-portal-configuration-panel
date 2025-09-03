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

const useThemeStyle = () => {
    // const auth = useAuth();
    // const {configPanelSettings, clientSettings} = useContext(ConfigPanelSettingsContext);
    // const downloadThemeLogo = async (style) => {
    //     const response = await fetch(
    //         `${configPanelSettings.backendUrl}/v1/theme/${clientSettings.applicationName}/style/${logo.logoId}`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: 'Bearer ' + auth.user?.access_token,
    //             }
    //         }
    //     )
    //     const data = await response.blob();
    //     const blob = data.slice(0, data.size, logo.contentType);
    //
    //     saveFile(blob, logo.filename);
    // }
    // const deleteThemeLogo = async (themeLogoId: string) => {
    //     return await fetch(
    //         `${configPanelSettings.backendUrl}/v1/theme/${clientSettings.applicationName}/logo/${themeLogoId}`,
    //         {
    //             method: 'DELETE',
    //             headers: {
    //                 Authorization: 'Bearer ' + auth.user?.access_token,
    //             }
    //         }
    //     );
    // }
    // const uploadFile = async (file: File): Promise<ThemeLogo> => {
    //     const uploadLink = `${configPanelSettings.backendUrl}/v1/theme/${clientSettings.applicationName}/logo`;
    //     const formData = new FormData();
    //     formData.append("file", file);
    //
    //     const response = await fetch(uploadLink, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${auth.user?.access_token}`,
    //         },
    //         body: formData,
    //     })
    //     return await response.json()
    // };

    return {
        // downloadThemeLogo: useMutation({
        //     mutationKey: ['downloadThemeLogo',],
        //     mutationFn: downloadThemeLogo
        // }),
        // uploadThemeLogo: useMutation({
        //     mutationKey: ['uploadThemeLogo',],
        //     mutationFn: uploadFile,
        //
        // }),
        // deleteThemeLogo: useMutation({
        //     mutationKey: ['deleteThemeLogo',],
        //     mutationFn: deleteThemeLogo,
        // })
    }
}

export default useThemeStyle;
