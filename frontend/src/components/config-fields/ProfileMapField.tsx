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
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { IconButton } from "@gemeente-denhaag/iconbutton";
import { ArrowRightIcon, TrashIcon } from "@gemeente-denhaag/icons";
import { Heading3, Heading4, Paragraph } from "@gemeente-denhaag/typography";
import {
  PROFILE_KEY_PATTERN,
  ProfileMapFieldSpec,
} from "../../interfaces/ConfigSection.ts";
import ActionField from "../ActionField.tsx";
import FieldRenderer, { FieldRendererProps } from "./FieldRenderer.tsx";
import configurationStyles from "../../styles/Configuration.module.scss";

/** A map of named profiles (`<key>.<name>.*`), each with the same fields. */
const ProfileMapField = ({
  field,
  path,
  values,
  onChange,
}: FieldRendererProps & { field: ProfileMapFieldSpec }) => {
  const intl = useIntl();
  const [newName, setNewName] = useState("");
  const profiles: Record<string, unknown> = _.get(values, path) ?? {};
  const names = Object.keys(profiles);
  const canAdd = PROFILE_KEY_PATTERN.test(newName) && !names.includes(newName);
  const addId = `add-${path.replace(/[^a-zA-Z0-9-]/g, "-")}`;

  const addProfile = () => {
    if (!canAdd) return;
    onChange(path, { ...profiles, [newName]: {} });
    setNewName("");
  };

  return (
    <>
      <Heading3>
        <FormattedMessage id={field.labelKey} />
      </Heading3>
      {names.map((name) => (
        <section
          className={configurationStyles["form-field__section"]}
          key={name}
        >
          <FormField
            className={configurationStyles["form-field__section__header"]}
          >
            <ActionField
              field={
                <Heading4>
                  {`${intl.formatMessage({ id: field.profileLabelKey })}: ${name}`}
                </Heading4>
              }
              button={
                <IconButton
                  type="button"
                  aria-label={intl.formatMessage({ id: "action.delete" })}
                  onClick={() => onChange(path, _.omit(profiles, name))}
                >
                  <TrashIcon />
                </IconButton>
              }
            />
          </FormField>
          {field.fields.map((child) => (
            <FieldRenderer
              key={child.key}
              field={child}
              path={`${path}.${name}.${child.key}`}
              values={values}
              onChange={onChange}
            />
          ))}
        </section>
      ))}
      <section className={configurationStyles["form-field__section"]}>
        <ActionField
          label={
            <FormLabel htmlFor={addId}>
              <FormattedMessage id={field.addLabelKey} />
            </FormLabel>
          }
          description={
            <Paragraph>
              {field.addDescriptionKey && (
                <FormattedMessage id={field.addDescriptionKey} />
              )}{" "}
              <FormattedMessage id="fields.profile-name.rule" />
            </Paragraph>
          }
          field={
            <TextInput
              id={addId}
              value={newName}
              placeholder={field.namePlaceholder}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addProfile();
                }
              }}
            />
          }
          button={
            <IconButton
              type="button"
              aria-label={intl.formatMessage({ id: "action.add" })}
              onClick={addProfile}
              disabled={!canAdd}
            >
              <ArrowRightIcon />
            </IconButton>
          }
        />
      </section>
    </>
  );
};

export default ProfileMapField;
