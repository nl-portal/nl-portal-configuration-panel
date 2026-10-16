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

import { useState } from "react";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { IconButton } from "@gemeente-denhaag/iconbutton";
import { ArrowRightIcon, TrashIcon } from "@gemeente-denhaag/icons";
import { Paragraph } from "@gemeente-denhaag/typography";
import {
  MAP_KEY_PATTERN,
  StringMapFieldSpec,
} from "../../interfaces/ConfigSection.ts";
import ActionField from "../ActionField.tsx";
import LabeledField from "./LabeledField.tsx";
import { FieldRendererProps } from "./FieldRenderer.tsx";
import styles from "./ConfigFields.module.scss";

/** Free key → value rows, e.g. HTTP headers. */
const StringMapField = ({
  field,
  path,
  values,
  onChange,
}: FieldRendererProps & { field: StringMapFieldSpec }) => {
  const intl = useIntl();
  const [newKey, setNewKey] = useState("");
  const entries: Record<string, unknown> = _.get(values, path) ?? {};
  const keys = Object.keys(entries);
  const canAdd = MAP_KEY_PATTERN.test(newKey) && !keys.includes(newKey);
  const baseId = path.replace(/[^a-zA-Z0-9-]/g, "-");

  const addEntry = () => {
    if (!canAdd) return;
    onChange(path, { ...entries, [newKey]: "" });
    setNewKey("");
  };

  return (
    <LabeledField field={field} inputId={`add-${baseId}`}>
      <div className={styles["config-field__group"]}>
        {keys.map((key) => (
          <ActionField
            key={key}
            label={
              <FormLabel htmlFor={`${baseId}-${key}`}>
                <code>{key}</code>
              </FormLabel>
            }
            field={
              <TextInput
                id={`${baseId}-${key}`}
                value={String(entries[key] ?? "")}
                onChange={(e) => onChange(`${path}.${key}`, e.target.value)}
              />
            }
            button={
              <IconButton
                type="button"
                aria-label={intl.formatMessage({ id: "action.delete" })}
                onClick={() => onChange(path, _.omit(entries, key))}
              >
                <TrashIcon />
              </IconButton>
            }
          />
        ))}
        <ActionField
          description={
            <Paragraph>
              <FormattedMessage id="fields.map-key.rule" />
            </Paragraph>
          }
          field={
            <TextInput
              id={`add-${baseId}`}
              value={newKey}
              placeholder={field.keyPlaceholder}
              onChange={(e) => setNewKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEntry();
                }
              }}
            />
          }
          button={
            <IconButton
              type="button"
              aria-label={intl.formatMessage({ id: "action.add" })}
              onClick={addEntry}
              disabled={!canAdd}
            >
              <ArrowRightIcon />
            </IconButton>
          }
        />
      </div>
    </LabeledField>
  );
};

export default StringMapField;
