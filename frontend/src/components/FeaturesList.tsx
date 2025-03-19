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
import {FormattedMessage} from "react-intl";
import styles from "./FeaturesList.module.scss";
import {Link} from "@gemeente-denhaag/link";
import {Paragraph} from "@gemeente-denhaag/typography";
import {CellObject, PortalLink, Table} from "@nl-portal/nl-portal-user-interface";
import {SettingsIcon} from "@gemeente-denhaag/icons";

interface FeaturesListProps {
    features: string[]
}

const FeaturesList = ({features}: FeaturesListProps) => {
    return (
      <Table
          headers={[ 
              {
                  key: "features",
                  head: true,
                  children: <Paragraph><b><FormattedMessage id={"features.feature"}/></b></Paragraph>,
              },
          ]}
          rows={features.map((featureId) => (
            [
                <span className={styles["features-list__header"]}>
                    <Paragraph><FormattedMessage id={"features." + featureId}/></Paragraph>
                </span>,
                <Link
                    href={`/features/${featureId}`}
                    icon={<SettingsIcon/>}
                    Link={PortalLink}
                    iconAlign="end"
                >
                    <div className={styles["features-list__value-edit"]}>
                        <Paragraph><FormattedMessage id={"features.configure"}/></Paragraph>
                    </div>
                </Link>
            ]
              )
          ) as unknown as CellObject[][]
          }
      />
    )
}

export default FeaturesList;
