import { FC } from "react"

type NavItem = {
  icon?: string
  label: string;
  isSelected?: Boolean;
}

const navItem: FC<NavItem> = ({ icon = '', label, isSelected = false }) => {
  const className = `${isSelected ? 'bg-pink-light' : 'bg-grey-light' } inline-flex items-center py-3 px-3 rounded-2xl`;
  return <div className={className}>{label}</div>;
}

export default navItem;