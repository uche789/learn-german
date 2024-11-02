import TopicList from "@/components/topicList/TopicList";
import HeadingText from "@/components/Heading";
import { useIdiomCollectionQuery } from "@/lib/api";
import categories from "@/lib/categories";
import getLangConfig from "@/lib/langConfig";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorText from "@/components/ErrorText";
import Loading from "@/components/Loading";

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

  if (isLoading) return <Loading />
  if (error) return <ErrorText text="idioms" />

  return <article>
    <HeadingText>Idioms</HeadingText>
    {!!data?.length && <TopicList topics={data} language={getLangConfig(params.lang).levelLanguage} />}
  </article>;
}
