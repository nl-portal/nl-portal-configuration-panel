import {ChangeEvent, useEffect, useState} from "react";
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

interface ObjectsApiConfiguration {
  enabled?: string;
  properties?: {
      "url"?: string,
      "token"?: string
  }
}

interface ObjectsApiFeatureConfigurationProps extends FeatureConfigurationProps {
  featureConfiguration: ObjectsApiConfiguration | undefined
}

const ObjectsApiFeatureConfiguration = ({
  featureConfiguration,
  onValid,
  onChange
}: ObjectsApiFeatureConfigurationProps) => {
  const [objectApiConfiguration, setObjectApiConfiguration] = useState<ObjectsApiConfiguration | undefined>()

  useEffect(() => {
    if (featureConfiguration) setObjectApiConfiguration(featureConfiguration)
  }, [featureConfiguration]);

  useEffect(() => {
    if (onChange) {
      onChange(objectApiConfiguration);
    }
  }, [objectApiConfiguration, onChange]);

  useEffect(() => {
    if (onValid) onValid(true)
  }, [onValid]);

  const handleInputChange = (
    propertyPath: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfiguration = _.clone(objectApiConfiguration ?? {});
    _.set(newConfiguration, propertyPath, event.target.value)
    setObjectApiConfiguration(newConfiguration)
  }

  return (
    <Fieldset className={styles["feature-config__form"]}>
      <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
        <Heading3><FormattedMessage id={"features.objectsapi.configuration"}></FormattedMessage></Heading3>
      </FieldsetLegend>
      <FormField type="checkbox">
        <Paragraph className="utrecht-form-field__label">
          <Checkbox
            id="objectsapi.enabled"
            className="utrecht-form-field__input"
            checked={objectApiConfiguration?.enabled == "true"}
            onChange={(e) => {
              setObjectApiConfiguration({
                ...objectApiConfiguration,
                enabled: e.target.checked.toString(),
              })
            }}
          />
          <FormLabel htmlFor="true" type="checkbox">
            <FormattedMessage id={"features.objectsapi.enable"}></FormattedMessage>
          </FormLabel>
        </Paragraph>
      </FormField>
      {objectApiConfiguration?.enabled == "true" && (
        <>
        <FormField type="text">
          <Paragraph>
            <FormattedMessage id={"features.objectsapi.url"}></FormattedMessage>
          </Paragraph>
          <TextInput
              id="objectsApi.url"
              name={"url"}
              defaultValue={objectApiConfiguration?.properties?.url}
              onChange={(e) => {
                handleInputChange( "properties.url", e);
              }}
          />
        </FormField>
        <FormField type="text">
          <Paragraph>
            <FormattedMessage id={"features.objectsapi.token"}></FormattedMessage>
          </Paragraph>
          <TextInput
            id="objectsApi.token"
            name={"token"}
            defaultValue={objectApiConfiguration?.properties?.token}
            required
            onChange={(e) => {
              handleInputChange( "properties.token", e);
            }}
          />
        </FormField>
        </>
      )}
    </Fieldset>
  )
}

export default ObjectsApiFeatureConfiguration;
