import { languageLevelDefinition } from "@/components/language/data";
import LessonType from "@/components/language/lesson-type";
import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import { AppLanguage, LanguageProficienyLevel, LessonTypeDefinition, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import categories from "@/lib/categories";
import { getPostCollection } from "@/lib/api/api";

export default function Practice() {
  const state = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Topic[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getPostCollection([categories.languages[state.language]], state.langCode, state.language);
        setPosts(result);
      } catch (error) {
        // set error here
      } finally {
        setLoading(false)
      }
    }
    if (!loading) {
      fetchData()
    }
  }, [state])

  return <article>
    {!!posts.length && <TopicList topics={posts} language={state.levelLanguage} />}
  </article>;
}
