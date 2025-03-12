import {Button} from "@gemeente-denhaag/button";
import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../constants/paths";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormField} from "@gemeente-denhaag/form-field";
import {FormLabel} from "@gemeente-denhaag/form-label";
import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import RadioButton from "@gemeente-denhaag/radio-button";
import {useState} from "react";
import styles from './FeatureDetailPage.module.scss'
import {FormattedMessage} from "react-intl";

const FeatureDetailPage = () => {
    const { featureId } = useParams();
    const navigate = useNavigate();
    const mutateFunction = () => {
    }

    const [featureEnabled] = useState(true);

    const onSave = (): void => {
        mutateFunction();
    };


    return (
        <PageGrid>
            <PageHeader>
                <Heading2><FormattedMessage id={"features." + featureId}/></Heading2>
            </PageHeader>
            <div>
                <PageHeader
                    title={
                        "Feature"
                    }
                >
                </PageHeader>
            </div>
            <div>
                <div className={styles["edit-feature__text-field-container"]}>
                    {featureEnabled ? (
                        <Fieldset>
                            <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                A
                            </FieldsetLegend>
                            <FormField type="radio">
                                <Paragraph className="utrecht-form-field__label utrecht-form-field__label--radio">
                                    <FormLabel htmlFor="true" type="radio">
                                        <RadioButton
                                            id="true"
                                            className="utrecht-form-field__input"
                                            name={"a"}
                                            value="EMAIL"
                                            defaultChecked={true}
                                            onChange={() => {
                                            }}
                                        />
                                        true
                                    </FormLabel>
                                </Paragraph>
                            </FormField>
                            <FormField type="radio">
                                <Paragraph className="utrecht-form-field__label utrecht-form-field__label--radio">
                                    <FormLabel htmlFor="false" type="radio">
                                        <RadioButton
                                            id="false"
                                            className="utrecht-form-field__input"
                                            name={"b"}
                                            value="FALSE"
                                            defaultChecked={true}
                                            onChange={() => {
                                            }}
                                        />
                                        false
                                    </FormLabel>
                                </Paragraph>
                            </FormField>
                        </Fieldset>
                    ) : (
                        <FormField invalid={false} type="text">
                            Error
                        </FormField>
                    )}
                </div>
                <div className={styles["edit-feature__buttons"]}>
                    <Button
                        className={styles["edit-feature__button"]}
                        onClick={onSave}
                        disabled={true}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary-action"
                        className={styles["edit-feature__button"]}
                        onClick={() => navigate(paths.features)}
                        disabled={false}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </PageGrid>
    );
};

export default FeatureDetailPage;
