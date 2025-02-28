import styles from "./PageHeader.module.scss";
import Skeleton from "./Skeleton";

interface Props {
    loading?: boolean;
    title?: string | React.ReactNode;
    subTitle?: string | React.ReactNode;
    children?: React.ReactNode;
}

const PageHeader = ({loading, title, children}: Props) => {
    if (loading) return <Skeleton height={40} width={250}/>;
    if (!title && !children) return null;

    return (
        <header className={styles["page-header"]}>
            <h1>{title}</h1>
            {children}
        </header>
    );
};

export default PageHeader;
