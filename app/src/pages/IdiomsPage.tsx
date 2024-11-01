import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import HeadingText from "@/features/layout/components/Heading";
import { getIdiomsCollection } from "@/lib/api/api";
import categories from "@/lib/categories";
import { AppLanguage, IdiomBase, SupportedLanguages, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";

export default function Idioms() {
  const state = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [idioms, setIdioms] = useState<Topic[]>([])
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getIdiomsCollection([categories.languages[state.language]], state.langCode, state.language);
        setIdioms(result);
      } catch (error) {
        // set error here
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [state])

  return <article>
    <HeadingText>Idioms</HeadingText>
    {!!idioms.length && <TopicList topics={idioms} language={state.levelLanguage} />}
  </article>;
}
