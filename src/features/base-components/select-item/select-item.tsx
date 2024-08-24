import { FC } from "react";
import SvgIcon from "../svg-icon/svg-icon";

type NavItem = {
  icon?: string
  label: string;
  isSelected?: Boolean;
}

const navItem: FC<NavItem> = ({ icon = '', label, isSelected = false }) => {
  const className = `${isSelected ? 'bg-pink-light' : 'bg-grey-light' } inline-flex items-center py-3 px-3 rounded-2xl`;
  return <button
    data-testid={'select-item'} className={className}
  >
    {icon && <SvgIcon name={icon} />}
    <span className="ps-2">{label}</span>
  </button>;
}

export default navItem;