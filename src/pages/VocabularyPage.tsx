import Loading from "@/components/Loading";
import TopicList from "@/components/topic-list/TopicList";
import Heading from "@/components/Heading";
import getLangConfig from "@/lib/langConfig";
import { Topic } from "@/lib/types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "@/context/global";
import { useVocabularyQuery } from "@/lib/api/vocab";

export default function VocabularyPage() {
  const [query, setQuery] = useState('')
  const params = useParams()
  const state = useContext(GlobalContext);
  const { data, isLoading, error, refetch } = useVocabularyQuery(state.langCode)
  const topics = useMemo(() => {
    const temp: Topic[] = []
    data?.forEach((vocab) => {
      if (!query
          || vocab.english_translation.toLowerCase().includes(query.toLowerCase())
          || vocab.word.toLowerCase().includes(query.toLowerCase())
        ) {
        temp.push({
          to: `/${getLangConfig(params.lang).langCode}/vocabulary/${vocab.word_type}_${vocab.word}`,
          id: String(vocab.vocab_id),
          lessonType: "",
          title: vocab.word,
          subTitle: vocab.english_translation,
          levels: new Set(vocab.levels)
        })
      }
    })
    return temp;
  }, [data, query])

  useEffect(() => {
    refetch()
  }, [params])

  if (isLoading) return <Loading />

  return <div>
    <Heading>Vocabulary</Heading>
      {data?.length &&
        <div className="mb-5">
          <input
            type="search" className="p-2 border border-gray-400 rounded w-full"
            placeholder="Search word"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      }
    {(error || !data?.length) && <div className="mt-8 text-center">Your vocabulary list is empty.</div>}
    <TopicList topics={topics} language={getLangConfig(params.lang).levelLanguage} />
  </div>;
}

