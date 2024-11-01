import React from "react";
import "./card.css";
import { SupportedLanguages, VocabularyWithTranslation } from "@/lib/types";

interface CardProps {
  word: VocabularyWithTranslation;
}

const Card: React.FC<CardProps> = ({ word }) => {
  const [lang, setLang] = React.useState<string>();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(!!word);
  }, [word]);

  const getLangText = () => {
    return lang === "en" ? word.language.toUpperCase() : "EN";
  };

  const getWord = () => {
    return lang === "en" ? word.translation : word.word;
  };

  const switchLang = () => {
    setLang(lang === "en" ? word.language : "en");
  };

  return (
    <>
      {show && (
        <div className="rounded-md border p-4">
          <div className="relative">
            <button className="rounded-full absolute bg-blue-500 text-white p-2 right-0 top-0" onClick={switchLang}>
              {getLangText()}
            </button>
          </div>
          <div className="text-center text-2xl font-semi-bold my-8">{getWord()}</div>
        </div>
      )}
    </>
  );
};

export default Card;
