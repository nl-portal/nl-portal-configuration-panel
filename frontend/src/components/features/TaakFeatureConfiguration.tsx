import {ChangeEvent, Fragment, useEffect, useState} from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormattedMessage} from "react-intl";
import {Heading3, Paragraph} from "@gemeente-denhaag/typography";
import {FormField} from "@gemeente-denhaag/form-field";
import {Checkbox} from "@gemeente-denhaag/checkbox";
import {FormLabel} from "@gemeente-denhaag/form-label";
import styles from '../../pages/FeatureConfigurationPage.module.scss'
import TextInput from "@gemeente-denhaag/text-input";
import _ from "lodash";

interface TaakConfiguration {
  enabled?: string;
  properties?: {
    "taakobject": {
      "type-url"?: string,
      "type-url-v2"?: string
    }
  }
}

interface TaakFeatureConfigurationProps extends FeatureConfigurationProps {
  featureConfiguration: TaakConfiguration | undefined
}

const TaakFeatureConfiguration = ({
                                    featureConfiguration,
                                    onValid,
                                    onChange
                                  }: TaakFeatureConfigurationProps) => {
  const [taakConfiguration, setTaakConfiguration] = useState<TaakConfiguration | undefined>()

  useEffect(() => {
    if (featureConfiguration) setTaakConfiguration(featureConfiguration)
  }, [featureConfiguration]);

  useEffect(() => {
    if (onChange) {
      onChange(taakConfiguration);
    }
  }, [taakConfiguration, onChange]);

  useEffect(() => {
    if (onValid) onValid(true)
  }, [onValid]);

  const handleInputChange = (
    propertyPath: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfiguration = _.clone(taakConfiguration ?? {});
    _.set(newConfiguration, propertyPath, event.target.value)
    setTaakConfiguration(newConfiguration)
  }

  return (
    <Fieldset className={styles["feature-config__form"]}>
      <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
        <Heading3><FormattedMessage id={"features.taak.configuration"}></FormattedMessage></Heading3>
      </FieldsetLegend>
      <FormField type="checkbox">
        <Paragraph className="utrecht-form-field__label">
          <Checkbox
            id="taak.enabled"
            className="utrecht-form-field__input"
            checked={taakConfiguration?.enabled == "true"}
            onChange={(e) => {
              setTaakConfiguration({
                ...taakConfiguration,
                enabled: e.target.checked.toString(),
              })
            }}
          />
          <FormLabel htmlFor="true" type="checkbox">
            <FormattedMessage id={"features.taak.enable"}></FormattedMessage>
          </FormLabel>
        </Paragraph>
      </FormField>
      {taakConfiguration?.enabled == "true" && (
        <Fragment>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.taak.typeUrl"}></FormattedMessage>
            </Paragraph>
            <TextInput
                id="taak.typeUrl"
                name={"typeUrl"}
                defaultValue={taakConfiguration?.properties?.taakobject["type-url"]}
                onChange={(e) => {
                  handleInputChange( "properties.taakobject.type-url", e);
                }}
            />
          </FormField>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.taak.typeUrlV2"}></FormattedMessage>
            </Paragraph>
            <TextInput
              id="taak.typeUrlV2"
              name={"typeUrlV2"}
              defaultValue={taakConfiguration?.properties?.taakobject["type-url-v2"]}
              required
              onChange={(e) => {
                handleInputChange( "properties.taakobject.type-url-v2", e);
              }}
            />
          </FormField>
        </Fragment>
      )}
    </Fieldset>
  )
}

export default TaakFeatureConfiguration
