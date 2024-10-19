import { FC } from "react";
import { LanguageLevelColour, languageLevelDefinition } from "./data";
import { LanguageProficienyLevel, LevelLanguage } from "@/types";

type NavItemProps = {
  level: LanguageProficienyLevel;
  language: LevelLanguage;
};

const LevelLabel: FC<NavItemProps> = ({ level, language }) => {
  const className = `${LanguageLevelColour[language][level]} inline-flex items-center py-2 px-3 rounded-2xl text-sm font-semibold`;
  return (
    <div data-testid={"level-" + level} className={className}>
      {languageLevelDefinition[language][level]}
    </div>
  );
};

export default LevelLabel;
