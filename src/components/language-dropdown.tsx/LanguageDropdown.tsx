import { FC, useState } from "react";
import "./LanguageDropdown.scss";
import SvgIcon from "../svg-icon/svg-icon";
import { AppLanguage, IconType, SupportedLanguages } from "@/lib/types";
import getLangConfig from "@/lib/langConfig";

const options: Array<{value: SupportedLanguages, label: AppLanguage}> = [
    {
      value: "de",
      label: AppLanguage.German
    },
    {
      value: "fr",
      label: AppLanguage.French,
    },
    {
      value: "jp",
      label: AppLanguage.Japanese,
    }
  ]

const LanguageDropdown: FC<{ selected?: string, clickHandler: (value: string) => void}> = ({
  selected = "de",
  clickHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getClassMenuItem = (value: string) =>
    `language-dropdown-menu-item ${selected === value ? "language-dropdown-menu-item--selected" : ""}`;

  const getClassMenu = () =>
    `language-dropdown-menu ${isOpen ? "language-dropdown-menu--open" : ""}`;


  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  };

  const handleSelectLanguage = (language: string) => {
    clickHandler(language);
    setIsOpen(false);
  };

  return (
    <div className="language-dropdown" aria-label="Select language">
      <button
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        className="language-dropdown-link"
    >
        <SvgIcon aria-hidden="true" name={getLangConfig(selected).language as unknown as IconType} />
      </button>
      <ul className={getClassMenu()} tabIndex={-1} role="listbox">
        {options.map((option) => {
          return (
            <li
                className={getClassMenuItem(option.value)}
                key={option.value} role="option"
                aria-selected={selected === option.value ? 'true' : 'false'}
            >
              <button onClick={() => handleSelectLanguage(option.value)}>
                <SvgIcon aria-hidden="true" name={getLangConfig(option.value).language as unknown as IconType} />
                <span className="ps-2">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
