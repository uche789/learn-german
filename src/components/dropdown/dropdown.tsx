import { FC } from "react";
import "./dropdown.scss";
import SvgIcon from "../svg-icon/svg-icon";
import { IconType } from "@/types";

type DropdownProps = {
  linkName: string;
  options: Array<{
    icon?: IconType;
    value: string;
    label: string;
  }>;
  selected?: string;
  clickHandler: (value: string) => void;
};

const dropdown: FC<DropdownProps> = ({
  linkName,
  options,
  clickHandler,
  selected,
}) => {
  const getClassName = (value: string) =>
    `dropdown-menu-item ${selected === value ? "dropdown-menu-item--selected" : ""}`;
  return (
    <div className="dropdown">
      <button className="dropdown-link">{linkName}</button>
      <ul className="dropdown-menu">
        {options.map((option) => {
          return (
            <li className={getClassName(option.value)} key={option.value}>
              <button onClick={() => clickHandler(option.value)}>
                {option.icon && <SvgIcon name={option.icon} />}
                <span className="ps-2">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default dropdown;
