import TopicList from "@/components/topicList/TopicList";
import HeadingText from "@/features/layout/components/Heading";
import { useIdiomCollectionQuery } from "@/lib/api";
import categories from "@/lib/categories";
import getLangConfig from "@/lib/langConfig";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Idioms() {
  const params = useParams()
  const {data, isLoading, error, refetch} = useIdiomCollectionQuery(
    [categories.languages[getLangConfig(params.lang).language]],
    getLangConfig(params.lang).langCode,
    getLangConfig(params.lang).language,
  )

  
  useEffect(() => {
    refetch()
  }, [params])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading idioms</div>;

  return <article>
    <HeadingText>Idioms</HeadingText>
    {!!data?.length && <TopicList topics={data} language={getLangConfig(params.lang).levelLanguage} />}
  </article>;
}
