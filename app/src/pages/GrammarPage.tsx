import { languageLevelDefinition } from "@/components/language/data";
import LessonType from "@/components/language/lesson-type";
import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import { AppLanguage, LanguageProficienyLevel, LessonTypeDefinition, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import categories from "@/lib/categories";
import { getPostCollection } from "@/lib/api/api";
import GrammarType from "@/features/grammar/components/GrammarType";
import { useSearchParams } from "react-router-dom";

export default function Practice() {
  const state = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Topic[]>([])
  const [ searchParams ] = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const ids = [categories.languages[state.language]]
        const selected = searchParams.get('grammarType');
        if (selected) {
          ids.push(categories.grammar[selected])
        }
        const result = await getPostCollection(ids, state.langCode);
        setPosts(result);
      } catch (error) {
        // set error here
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [state, searchParams])

  return <article>
    <GrammarType  />
    {!!posts.length && <TopicList topics={posts} language={state.levelLanguage} />}
  </article>;
}
