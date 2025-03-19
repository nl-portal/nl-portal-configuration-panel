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

interface CatalogiApiConfiguration {
  enabled?: string;
  properties?: {
      "url"?: string,
      "clientid"?: string,
      "secret"?: string,
      "rsin"?: string,
      "documentTypeUrl": string,
  }
}

interface CatalogiApiFeatureConfigurationProps extends FeatureConfigurationProps {
  featureConfiguration: CatalogiApiConfiguration | undefined
}

const CatalogiApiFeatureConfiguration = ({
  featureConfiguration,
  onValid,
  onChange
}: CatalogiApiFeatureConfigurationProps) => {
  const [objectApiConfiguration, setObjectApiConfiguration] = useState<CatalogiApiConfiguration | undefined>()

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
        <Heading3><FormattedMessage id={"features.catalogiapi.configuration"}></FormattedMessage></Heading3>
      </FieldsetLegend>
      <FormField type="checkbox">
        <Paragraph className="utrecht-form-field__label">
          <Checkbox
            id="Catalogiapi.enabled"
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
            <FormattedMessage id={"features.catalogiapi.enable"}></FormattedMessage>
          </FormLabel>
        </Paragraph>
      </FormField>
      {objectApiConfiguration?.enabled == "true" && (
        <Fragment>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.catalogiapi.url"}></FormattedMessage>
            </Paragraph>
            <TextInput
                id="CatalogiApi.url"
                name={"url"}
                defaultValue={objectApiConfiguration?.properties?.url}
                onChange={(e) => {
                  handleInputChange( "properties.url", e);
                }}
            />
          </FormField>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.catalogiapi.clientid"}></FormattedMessage>
            </Paragraph>
            <TextInput
              id="catalogiApi.clientid"
              name={"clientId"}
              defaultValue={objectApiConfiguration?.properties?.clientid}
              required
              onChange={(e) => {
                handleInputChange( "properties.clientid", e);
              }}
            />
          </FormField>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.catalogiapi.secret"}></FormattedMessage>
            </Paragraph>
            <TextInput
                id="catalogiApi.secret"
                name={"secret"}
                defaultValue={objectApiConfiguration?.properties?.secret}
                required
                onChange={(e) => {
                  handleInputChange( "properties.secret", e);
                }}
            />
          </FormField>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.catalogiapi.rsin"}></FormattedMessage>
            </Paragraph>
            <TextInput
                id="catalogiApi.rsin"
                name={"rsin"}
                defaultValue={objectApiConfiguration?.properties?.rsin}
                required
                onChange={(e) => {
                  handleInputChange( "properties.rsin", e);
                }}
            />
          </FormField>
          <FormField type="text">
            <Paragraph>
              <FormattedMessage id={"features.catalogiapi.documentTypeUrl"}></FormattedMessage>
            </Paragraph>
            <TextInput
                id="catalogiApi.documentTypeUrl"
                name={"documentTypeUrl"}
                defaultValue={objectApiConfiguration?.properties?.documentTypeUrl}
                required
                onChange={(e) => {
                  handleInputChange( "properties.documentTypeUrl", e);
                }}
            />
          </FormField>
        </Fragment>
      )}
    </Fieldset>
  )
}

export default CatalogiApiFeatureConfiguration;
