import { FC } from "react"
import { AppLanguage, LanguageLevel, LanguageLevelColour, languageLevelDefinition } from "./data";

type NavItem = {
  level: LanguageLevel;
  language: AppLanguage
}

const navItem: FC<NavItem> = ({ level, language }) => {
  const className = `${ LanguageLevelColour[language][level] } inline-flex items-center py-2 px-3 rounded-2xl text-sm font-semibold`;
  return <div data-testid={'level-' + level} className={className}>{languageLevelDefinition[language][level]}</div>;
}

export default navItem;