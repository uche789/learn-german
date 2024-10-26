import { languageLevelDefinition } from "@/components/language/data";
import LessonType from "@/components/language/lesson-type";
import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import { AppLanguage, LanguageProficienyLevel, LessonTypeDefinition, Topic } from "@/lib/types";
import { useContext, useEffect } from "react";
import categories from "@/lib/categories";
import { getPostCollection } from "@/lib/api/api";

export default function Practice() {
  const state = useContext(GlobalContext);

  useEffect(() => {
    getPostCollection([categories.languages[state.language]])
  }, [state])

  const topic: Topic = {
    lessonType: LessonTypeDefinition.Genitive,
    title: "Deklination",
    levels: new Set([LanguageProficienyLevel.UpperBeginner]),
    to: "/fr/llll",
    id: "1"
  }

  const topicJp: Topic = {
    lessonType: LessonTypeDefinition.Grammar,
    title: "Ni kakawarazu",
    levels: new Set([LanguageProficienyLevel.UpperIntermediary]),
    to: "/fr/llll",
    id: "2"
  }

  const topics: Record<AppLanguage, Topic[]> = {
    [AppLanguage.Japanese]: [topicJp],
    [AppLanguage.German]: [topic],
    [AppLanguage.French]: []
  }

  return <article>
    <TopicList topics={topics[state.language]} language={state.levelLanguage} />
  </article>;
}
