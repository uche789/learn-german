import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import Heading from "@/features/layout/components/Heading";
import { AdminVocabulary, LanguageProficienyLevel, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VocabularyPage() {
  const state = useContext(GlobalContext);
  const [query, setQuery] = useState('')
  const [data, setData] = useState<AdminVocabulary[]>([])

  const topics: Topic[] = [
    {
      id: "1",
      lessonType: "",
      title: "Apfel",
      levels: new Set([LanguageProficienyLevel.Beginner, LanguageProficienyLevel.UpperBeginner]),
      to: `/${state.langCode}/vocabulary/apfel`
    }
  ]

  useEffect(() => {
    console.log('comes here')
  }, [state.langCode, query])

  return <div>
    <Heading>Vocabulary</Heading>
    <div className="mb-5">
      <input
        type="search" className="p-2 border border-gray-400 rounded w-full"
        placeholder="Search word"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
    <TopicList topics={topics} language={state.levelLanguage} />
  </div>;
}

