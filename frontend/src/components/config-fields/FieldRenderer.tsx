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

import { ChangeEvent, useEffect } from "react";
import _ from "lodash";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import { TextInput } from "@gemeente-denhaag/text-input";
import { Checkbox } from "@gemeente-denhaag/checkbox";
import { Heading4, Paragraph } from "@gemeente-denhaag/typography";
import {
  FormToggle,
  Select,
  SelectOption,
} from "@utrecht/component-library-react";
import CodeEditor from "../CodeEditor.tsx";
import {
  EnumOption,
  FieldSpec,
  GroupFieldSpec,
  KeyRefSelectFieldSpec,
} from "../../interfaces/ConfigSection.ts";
import { matchOption } from "../../constants/enums.ts";
import PasswordInput from "../PasswordInput.tsx";
import LabeledField from "./LabeledField.tsx";
import ProfileMapField from "./ProfileMapField.tsx";
import StringMapField from "./StringMapField.tsx";
import { fieldError, isDependencySatisfied, toList } from "./fieldValues.ts";
import { sslFields } from "./sslFields.ts";
import styles from "./ConfigFields.module.scss";
import configurationStyles from "../../styles/Configuration.module.scss";

export interface FieldRendererProps {
  field: FieldSpec;
  /** Absolute path of the field within the section data. */
  path: string;
  /** The section's complete data, used for `dependsOn` and sibling lookups. */
  values: object;
  onChange: (path: string, value: unknown) => void;
}

const inputId = (path: string) =>
  `field-${path.replace(/[^a-zA-Z0-9-]/g, "-")}`;

/** Merges stored values with the options; unknown stored values stay selectable so they aren't lost. */
const withStoredOptions = (
  options: EnumOption[],
  stored: string[],
): EnumOption[] => [
  ...options,
  ...stored
    .filter((value) => !matchOption(options, value))
    .map((value) => ({ value })),
];

const OptionLabel = ({ option }: { option: EnumOption }) =>
  option.labelKey ? <FormattedMessage id={option.labelKey} /> : option.value;

const GroupField = ({
  field,
  path,
  values,
  onChange,
}: FieldRendererProps & { field: GroupFieldSpec }) => (
  <fieldset className={styles["config-field__group"]}>
    <legend className={styles["config-field__group-title"]}>
      <Heading4>
        <FormattedMessage id={field.labelKey} />
      </Heading4>
      {field.descriptionKey && (
        <Paragraph>
          <FormattedMessage id={field.descriptionKey} />
        </Paragraph>
      )}
    </legend>
    {field.fields.map((child) => (
      <FieldRenderer
        key={child.key}
        field={child}
        path={`${path}.${child.key}`}
        values={values}
        onChange={onChange}
      />
    ))}
  </fieldset>
);

const KeyRefSelectField = ({
  field,
  path,
  values,
  onChange,
}: FieldRendererProps & { field: KeyRefSelectFieldSpec }) => {
  const intl = useIntl();
  const id = inputId(path);
  const value: unknown = _.get(values, path);
  const stringValue =
    value === undefined || value === null ? "" : String(value);
  const parentPath = path.substring(0, path.lastIndexOf("."));
  const refPath = parentPath ? `${parentPath}.${field.refKey}` : field.refKey;
  const keys = Object.keys(_.get(values, refPath) ?? {});
  const firstKey = keys[0];
  const isStoredKey = keys.includes(stringValue);

  useEffect(() => {
    if (firstKey === undefined) {
      if (stringValue) onChange(path, "");
    } else if (!isStoredKey) {
      onChange(path, firstKey);
    }
  }, [firstKey, isStoredKey, stringValue, path]);

  return (
    <LabeledField field={field} inputId={id}>
      <Select
        id={id}
        className={configurationStyles["form-field__select"]}
        value={keys.length === 0 ? "" : stringValue}
        disabled={keys.length === 0}
        onChange={(e) => onChange(path, e.target.value)}
      >
        {keys.length === 0 && (
          <SelectOption value="" disabled>
            {intl.formatMessage({ id: "fields.key-ref-select.empty" })}
          </SelectOption>
        )}
        {keys.map((key) => (
          <SelectOption key={key} value={key}>
            {key}
          </SelectOption>
        ))}
      </Select>
    </LabeledField>
  );
};

const FieldRenderer = (props: FieldRendererProps) => {
  const { field, path, values, onChange } = props;
  const intl = useIntl();

  if (!isDependencySatisfied(field, values)) return null;

  const id = inputId(path);
  const value: unknown = _.get(values, path);
  const stringValue =
    value === undefined || value === null ? "" : String(value);
  const placeholder = field.placeholder;
  const onText = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(path, e.target.value);
  const error = fieldError(field, value);

  switch (field.type) {
    case "text":
    case "url":
    case "number":
      return (
        <LabeledField field={field} inputId={id}>
          <TextInput
            id={id}
            type={field.type}
            value={stringValue}
            placeholder={placeholder}
            onChange={onText}
          />
        </LabeledField>
      );
    case "secret":
      return (
        <LabeledField field={field} inputId={id}>
          <PasswordInput
            id={id}
            value={stringValue}
            placeholder={placeholder}
            onChange={onText}
            autoComplete="off"
          />
        </LabeledField>
      );
    case "json":
      return (
        <LabeledField
          field={field}
          inputId={id}
          error={error && <FormattedMessage id={error} />}
        >
          <div
            id={id}
            className={classNames(styles["config-field__code"], {
              [styles["config-field__code--invalid"]]: !!error,
            })}
          >
            <CodeEditor
              value={stringValue}
              onChange={(code) => onChange(path, code ?? "")}
              height="10em"
              language="json"
              options={{
                placeholder,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "off",
              }}
            />
          </div>
        </LabeledField>
      );
    case "bool":
      return (
        <LabeledField field={field} inputId={id}>
          <Checkbox
            id={id}
            checked={value === true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(path, e.target.checked)
            }
          />
        </LabeledField>
      );
    case "toggle":
      return (
        <LabeledField field={field} inputId={id}>
          <FormToggle
            id={id}
            className={configurationStyles["form-field__toggle"]}
            checked={value === true}
            onChange={(e) => onChange(path, e.currentTarget.checked)}
          />
        </LabeledField>
      );
    case "enum": {
      const selected =
        matchOption(field.options, stringValue)?.value ?? stringValue;
      const options = withStoredOptions(
        field.options,
        selected ? [selected] : [],
      );
      return (
        <LabeledField field={field} inputId={id}>
          <Select
            id={id}
            className={configurationStyles["form-field__select"]}
            value={selected}
            onChange={(e) => onChange(path, e.target.value)}
          >
            <SelectOption value="">
              {intl.formatMessage({ id: "defaults.use-default" })}
            </SelectOption>
            {options.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                <OptionLabel option={option} />
              </SelectOption>
            ))}
          </Select>
        </LabeledField>
      );
    }
    case "enumMulti": {
      const selected = toList(value).map(
        (it) => matchOption(field.options, it)?.value ?? it,
      );
      const options = withStoredOptions(field.options, selected);
      return (
        <LabeledField field={field} inputId={id}>
          <Select
            id={id}
            className={configurationStyles["form-field__select"]}
            multiple
            size={Math.min(options.length, 10)}
            value={selected}
            onChange={(e) =>
              onChange(
                path,
                Array.from(e.target.selectedOptions).map((it) => it.value),
              )
            }
          >
            {options.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                <OptionLabel option={option} />
              </SelectOption>
            ))}
          </Select>
        </LabeledField>
      );
    }
    case "keyRefSelect":
      return <KeyRefSelectField {...props} field={field} />;
    case "group":
      return <GroupField {...props} field={field} />;
    case "ssl":
      return (
        <GroupField
          {...props}
          field={{
            type: "group",
            key: field.key,
            labelKey: field.labelKey,
            descriptionKey: field.descriptionKey ?? "fields.ssl.description",
            default: null,
            fields: sslFields,
          }}
        />
      );
    case "profileMap":
      return <ProfileMapField {...props} field={field} />;
    case "stringMap":
      return <StringMapField {...props} field={field} />;
  }
};

export default FieldRenderer;
