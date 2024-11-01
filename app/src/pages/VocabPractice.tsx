import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/features/card/Card";
import Switcher from "@/features/switcher/Switcher";
import BackPreviousPage from "@/features/layout/components/BackPreviousPage";
import { GlobalContext } from "@/context/global";
import { getTopics } from "@/features/vocabulary/lib/api";
import { Topic, VocabularyWithTranslation } from "@/lib/types";

export default function VocabularyPractice() {
  const params = useParams()
  const [dictionary, setDictionary] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const state = useContext(GlobalContext);
  const [word, setWord] = React.useState<VocabularyWithTranslation>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getTopics(state.langCode);
        setDictionary(result);
        setWord(getRandonWord(result))
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [state.langCode])
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandonWord = (result?: Topic[]) => {
    const tempDictionay = (result || dictionary)
    const index = getRandomInt(tempDictionay.length);
    const newWord: VocabularyWithTranslation = {
      word: tempDictionay[index].title,
      translation: tempDictionay[index].subTitle || '',
      language: state.langCode,
    };
    return newWord;
  };


  const onSwitch = () => {
    setWord(getRandonWord());
  };
  return <div>
    {!loading && word && <>
      <BackPreviousPage text="practice" link={`/${state.langCode}/practice`} />
      <Card word={word} />
      <Switcher onSwitch={onSwitch} />
    </>}
  </div>;
}
