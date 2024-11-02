import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import { useContext, useEffect, useState } from "react";
import categories from "@/lib/categories";
import { useGrammarCollectionQuery } from "@/lib/api";
import GrammarType from "@/features/grammar/components/GrammarType";
import { useParams, useSearchParams } from "react-router-dom";
import getLangConfig from "@/lib/langConfig";

export default function Practice() {
  const [ searchParams ] = useSearchParams();
  const params = useParams()
  const [ids, setIds] = useState([categories.languages[ getLangConfig(params.lang).language]])
  const {data, isLoading, error, refetch} = useGrammarCollectionQuery(ids, getLangConfig(params.lang).langCode)

  useEffect(() => {
    const ids = [categories.languages[ getLangConfig(params.lang).language]]
    const selected = searchParams.get('grammarType');
    if (selected) {
      setIds([...ids, categories.grammar[selected]])
    }
    refetch()
  }, [params, searchParams])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading grammar list</div>;

  return <article>
    <div className="mb-8">
      <GrammarType />
    </div>
    {!!data?.length && <TopicList topics={data} language={ getLangConfig(params.lang).levelLanguage} />}
  </article>;
}
