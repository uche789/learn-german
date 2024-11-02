import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@/features/card/Card";
import Switcher from "@/features/switcher/Switcher";
import BackPreviousPage from "@/features/layout/components/BackPreviousPage";
import { GlobalContext } from "@/context/global";
import { VocabularyType, VocabularyWithTranslation } from "@/lib/types";
import { useVocabularyQuery } from "@/lib/api";
import getLangConfig from "@/lib/langConfig";

export default function VocabularyPractice() {
  const params = useParams()
  const state = useContext(GlobalContext);
  const [word, setWord] = React.useState<VocabularyWithTranslation>();
  const { data, isLoading, error, refetch } = useVocabularyQuery(getLangConfig(params.lang).langCode)

  useEffect(() => {
    refetch().then((result) => {
      getRandonWord(result.data)
    })
  }, [params])
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandonWord = (result?: VocabularyType[]) => {
    const tempDictionay = (result || data || [])
    const index = getRandomInt(tempDictionay.length);
    const newWord: VocabularyWithTranslation = {
      word: tempDictionay[index].word,
      translation: tempDictionay[index].english_translation,
      language: state.langCode,
    };
    setWord(newWord)
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading practice for vocabulary</div>;

  return <div>
    {word && <>
      <BackPreviousPage text="practice" link={`/${state.langCode}/practice`} />
      <Card word={word} />
      <Switcher onSwitch={() => getRandonWord()} />
    </>}
  </div>;
}
