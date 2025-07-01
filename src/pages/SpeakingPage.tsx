import ErrorText from "@/components/ErrorText";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import SubHeading from "@/components/SubHeading";
import { GlobalContext } from "@/context/global";
import Card from "@/features/vocabulary/components/card/Card";
import Switcher from "@/features/vocabulary/components/switcher/Switcher";
import BackPreviousPage from "@/layout/components/BackPreviousPage";
import { useSpeakingQuery } from "@/lib/api/speaking";
import { useContext, useEffect, useState } from "react";

export default function SpeakingPage() {
  const state = useContext(GlobalContext);
  const { data, isLoading, error, refetch } = useSpeakingQuery(state.langCode);
  const [word, setWord] = useState<string>();

  useEffect(() => {
    refetch().then((result) => {
        getRandonWord(result.data)
    })
  }, [state.langCode])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandonWord = (result?: string[]) => {
    const tempDictionay = (result || data || [])
    const index = getRandomInt(tempDictionay.length);
    const newWord: string = tempDictionay[index];
    setWord(newWord)
  };
  if (isLoading) return <Loading />
  if (error) return <ErrorText text="speaking" />

  return <div>
    <Heading>Speaking Practice</Heading>
    <SubHeading>Practice speaking using guided prompts and key vocabulary.</SubHeading>
    {word && <>
      <div className="rounded-md border p-4">
        <div className="flex items-center justify-center text-2xl font-semi-bold my-8 min-h-64">{word}</div>
      </div>
      <Switcher onSwitch={() => getRandonWord()} label="Next prompt" />
    </>}
  </div>;
}