import Loading from "@/components/Loading";
import TopicList from "@/components/topic-list/TopicList";
import Heading from "@/components/Heading";
import getLangConfig from "@/lib/langConfig";
import { Topic } from "@/lib/types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GlobalContext } from "@/context/global";
import { useVocabularyQuery } from "@/lib/api/vocab";
import VocabType from "@/features/vocabulary/components/VocabType";

export default function VocabularyPage() {
  const [query, setQuery] = useState('')
  const params = useParams()
  const [searchParams] = useSearchParams()
  const state = useContext(GlobalContext);
  const { data, isLoading, error, refetch } = useVocabularyQuery(state.langCode)
  const topics = useMemo(() => {
    const temp: Topic[] = []
    return data?.filter((item) => !searchParams.get('vocabType')? item : item.word_type === searchParams.get('vocabType'))
      .filter((item) => !query 
        ? item
        : item.english_translation.toLowerCase().includes(query.toLowerCase()) || item.word.toLowerCase().includes(query.toLowerCase())
      )
      .map((item) => {
        return {
          to: `/${getLangConfig(params.lang).langCode}/vocabulary/${item.word_type}_${item.word}`,
          id: String(item.vocab_id),
          lessonType: "",
          title: item.word,
          subTitle: item.english_translation,
          levels: new Set(item.levels),
          type: item.word_type as string,
        }
      }) || [];
  }, [data, query, searchParams])

  useEffect(() => {
    refetch()
  }, [params])

  if (isLoading) return <Loading />

  return <div>
    <Heading>Vocabulary</Heading>
      {!!data?.length &&
        <div className="mb-5">
          <input
            type="search" className="p-2 border border-gray-400 rounded w-full"
            placeholder="Search word"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-5">
            <VocabType />
          </div>
        </div>
      }
    {(error || !data?.length) && <div className="mt-8 text-center">Your vocabulary list is empty.</div>}
    <TopicList topics={topics} language={getLangConfig(params.lang).levelLanguage} />
  </div>;
}

