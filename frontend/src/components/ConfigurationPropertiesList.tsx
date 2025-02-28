import styles from "./ConfigurationPropertiesList.module.scss";
import {Paragraph} from "@gemeente-denhaag/typography";
import {CellObject, Skeleton, Table} from "@nl-portal/nl-portal-user-interface";

interface ConfigProperty {
    propertyKey: string;
    propertyValue: string;
    application: string;
    modifiedOn: Date;
}

interface Props {
    loading?: boolean;
    error?: boolean;
    errorTranslationId?: string;
    showEmpty?: boolean;
    emptyTranslationId?: string;
    titleTranslationId?: string | null;
    readMoreLink?: string;
    readMoreTranslationId?: string | null;
    totalAmount?: number;
    configurationProperties?: ConfigProperty[];
    index?: number;
    indexLimit?: number;
    onChange?: (index: number) => number;
}

const ConfigurationPropertiesList = ({
                                         loading,
                                         error,
                                         showEmpty = true,
                                         configurationProperties,
                                     }: Props) => {

    if (loading) {
        return (
            <section className={styles["configurations-list"]}>
                <Skeleton height={60}/>
            </section>
        );
    }

    if (error)
        return (
            <section className={styles["configurations-list"]}>
                <Paragraph>Failed to load Configuration Properties</Paragraph>
            </section>
        );

    if (!configurationProperties || configurationProperties.length === 0) {
        if (!showEmpty) return null;
        return (
            <section className={styles["configurations-list"]}>
                <Paragraph>Nothing found</Paragraph>
            </section>
        );
    }

    return (
        <section className={styles["configurations-list"]}>
            <Table
                headers={[
                    {
                        key: "propertyKey",
                        head: true,
                        children: <Paragraph><b>Property Key</b></Paragraph>,
                    },
                    {
                        key: "propertyValue",
                        head: true,
                        children: <Paragraph><b>Property Value</b></Paragraph>,
                    },
                ]}
                rows={Object.values(configurationProperties).map(({propertyKey, propertyValue}) => (
                        [
                            <Paragraph>{propertyKey}</Paragraph>,
                            <Paragraph>{propertyValue}</Paragraph>
                        ]
                    )
                ) as unknown as CellObject[][]
                }
            />
        </section>
    );
};

export default ConfigurationPropertiesList;
