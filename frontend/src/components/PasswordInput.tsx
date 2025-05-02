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

import React, {ForwardedRef, forwardRef, useState} from "react";
import TextInput, {TextInputProps} from "@gemeente-denhaag/text-input";
import IconButton from "@gemeente-denhaag/iconbutton";
import {HideIcon, ShowIcon} from "@gemeente-denhaag/icons";

interface PasswordInputProps extends TextInputProps {
    id: string
}

const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>> = forwardRef(
    (defaultProps: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const [showValue, setShowValue] = useState(false)

        return (
            <TextInput
                {...defaultProps}
                ref={ref}
                type={showValue ? "text" : "password"}
                iconEnd={
                    <IconButton
                        onClick={() => setShowValue(!showValue)}
                    >
                        {showValue ? <HideIcon/> : <ShowIcon/>}
                    </IconButton>
                }
            />
        );
    },
);

export default PasswordInput;