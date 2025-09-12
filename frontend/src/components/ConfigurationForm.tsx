import {FormHTMLAttributes, ReactNode} from "react";
import styles from "../styles/Configuration.module.scss";

interface ConfigurationFormProps extends FormHTMLAttributes<HTMLFormElement> {
    children?: ReactNode;
}

export const ConfigurationForm = (
    {
        children,
        ...props
    }: ConfigurationFormProps,
) => {

    return (
        <form
            id={"configuration-form"}
            className={styles["configuration-form"]}
            {...props}
        >
            <button
                aria-hidden="true"
                className={styles["hidden"]}
                disabled
                type="submit"
            />
            {children}
        </form>
    );
};

export default ConfigurationForm;
