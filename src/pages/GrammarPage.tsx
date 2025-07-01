import TopicList from "@/components/topic-list/TopicList";
import { useEffect, useState } from "react";
import categories from "@/lib/categories";
import { useGrammarCollectionQuery } from "@/lib/api";
import GrammarType from "@/features/grammar/components/GrammarType";
import { useParams, useSearchParams } from "react-router-dom";
import getLangConfig from "@/lib/langConfig";
import Loading from "@/components/Loading";
import ErrorText from "@/components/ErrorText";
import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";

export default function GrammarPage() {
  const [ searchParams ] = useSearchParams();
  const params = useParams()
  const [ids, setIds] = useState([categories.languages[ getLangConfig(params.lang).language]])
  const {data, isLoading, error, refetch} = useGrammarCollectionQuery(ids, getLangConfig(params.lang).langCode)

  useEffect(() => {
    const ids = [categories.languages[ getLangConfig(params.lang).language]]
    const selected = searchParams.get('grammarType');
    if (selected) {
      setIds([...ids, categories.grammar[selected]])
    } else {
      setIds(ids)
    }
    refetch()
  }, [params, searchParams])

  if (isLoading) return <Loading />
  if (error) return <ErrorText text="grammar list" />

  return <article>
    <Heading>Grammar</Heading>
    <SubHeading>Essential grammar rules and structures</SubHeading>
    <div className="mb-8">
      <GrammarType />
    </div>
    {(!searchParams.has('grammarType') && !data?.length) && <div className="mt-8 text-center">Your grammar list is empty.</div>}
    {!!data?.length && <TopicList topics={data} language={ getLangConfig(params.lang).levelLanguage} />}
  </article>;
}
