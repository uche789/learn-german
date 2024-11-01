import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import Heading from "@/features/layout/components/Heading";
import { getFile, getTopics } from "@/features/vocabulary/lib/api";
import { AdminVocabulary, LanguageProficienyLevel, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VocabularyPage() {
  const state = useContext(GlobalContext);
  const [query, setQuery] = useState('')
  const [data, setData] = useState<Topic[]>([])
  const params = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        setData([]);
        const result = await getTopics(state.langCode);
        setData(result);
      } catch {
      }
    }

    fetchData()
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
    <TopicList topics={data} language={state.levelLanguage} />
  </div>;
}

