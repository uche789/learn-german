import { FC, MouseEventHandler } from "react";
import "./dropdown.scss";

type DropdownProps = {
  linkName: string;
  options: Array<{
    icon?: string;
    value: string;
    label: string;
  }>
  selected?: string;
  clickHandler: (value: string) => void
}

const dropdown: FC<DropdownProps> = ({ linkName, options, clickHandler, selected }) => {
  const getClassName = (value: string) => `dropdown-menu-item ${selected === value ? 'dropdown-menu-item--selected' : ''}`
  return (
    <div className="dropdown">
      <button className="dropdown-link">{linkName}</button>
      <ul className="dropdown-menu">
        {options.map((option) => {
          return <li className={getClassName(option.value)} key={option.value}>
            <button onClick={() => clickHandler(option.value)}>{option.label}</button>
          </li>
        })}
      </ul>
    </div>)
}

export default dropdown;