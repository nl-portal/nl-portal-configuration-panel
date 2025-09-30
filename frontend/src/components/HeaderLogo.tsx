import { cloneElement, ReactElement } from "react";

interface HeaderLogoProps {
  logo: ReactElement<HTMLOrSVGImageElement>;
}

export const HeaderLogo = ({ logo }: HeaderLogoProps) => {
  return cloneElement(logo, { className: "asd" });
};
