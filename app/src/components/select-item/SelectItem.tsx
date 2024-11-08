import { FC, MouseEventHandler } from "react";
import SvgIcon from "../svg-icon/svg-icon";
import { IconType } from "@/lib/types";
import { click } from "@testing-library/user-event/dist/types/setup/directApi";

type NavItem = {
  icon?: IconType;
  label: string;
  isSelected?: Boolean;
  isBolded?: Boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const navItem: FC<NavItem> = ({
  icon,
  label,
  isSelected = false,
  isBolded = false,
  onClick,
}) => {
  const className = `${isSelected ? "bg-pink-light" : "bg-grey-light"}
  inline-flex items-center py-2 px-3 rounded-2xl`;

  const labelClassName = `${icon ? "ps-2" : ""} ${isBolded ? "font-semibold" : ""}`;

  return (
    <button data-testid="select-item" className={className} onClick={onClick}>
      {icon && <SvgIcon name={icon} />}
      <span data-testid="select-item-label" className={labelClassName}>
        {label}
      </span>
    </button>
  );
};

export default navItem;
