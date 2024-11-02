import Loading from "@/components/Loading";
import TopicList from "@/components/topicList/TopicList";
import Heading from "@/components/Heading";
import { useVocabularyQuery } from "@/lib/api";
import getLangConfig from "@/lib/langConfig";
import { Topic } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorText from "@/components/ErrorText";

export default function VocabularyPage() {
  const [query, setQuery] = useState('')
  const params = useParams()
  const { data, isLoading, error, refetch } = useVocabularyQuery(getLangConfig(params.lang).langCode)
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
  if (error) return <ErrorText text="vocabulary" />

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
    {}
    <TopicList topics={topics} language={getLangConfig(params.lang).levelLanguage} />
  </div>;
}

