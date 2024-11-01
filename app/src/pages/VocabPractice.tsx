import { Word } from "@/App";
import React from "react";
import { useParams } from "react-router-dom";
import dictionary from "@/assets/english-german.json";
import Card from "@/features/card/Card";
import Switcher from "@/features/switcher/Switcher";
import BackPreviousPage from "@/features/layout/components/BackPreviousPage";

export default function VocabularyPractice() {
  const params = useParams()
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandonWord = (): Word => {
    const wordKeys = Object.keys(dictionary);
    const index = getRandomInt(wordKeys.length);
    const english = wordKeys[index];
    const german = (dictionary as Record<string, string>)[english];
    const newWord: Word = {
      german,
      english,
    };
    return newWord;
  };

  const [word, setWord] = React.useState<Word>(getRandonWord());

  const onSwitch = () => {
    setWord(getRandonWord());
  };
  return <div>
    <BackPreviousPage text="practice" />
    <Card word={word} />
    <Switcher onSwitch={onSwitch} />
  </div>;
}
