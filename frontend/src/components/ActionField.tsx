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

import React, {
  cloneElement,
  ForwardedRef,
  forwardRef,
  ReactElement,
} from "react";
import { FormField, FormFieldProps } from "@gemeente-denhaag/form-field";
import styles from "./ActionField.module.scss";

interface ActionFieldProps extends FormFieldProps {
  field: ReactElement;
  button: ReactElement;
}

const ActionField: React.ForwardRefExoticComponent<
  ActionFieldProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    { field: fieldElement, button: buttonElement, ...defaultProps },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <FormField {...defaultProps} ref={ref}>
        <div className={styles["action-field__row"]}>
          {fieldElement}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {cloneElement<any>(buttonElement, {
            className: styles["action-field__button"],
          })}
        </div>
      </FormField>
    );
  },
);

export default ActionField;
