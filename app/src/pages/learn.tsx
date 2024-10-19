import { languageLevelDefinition } from "@/components/language/data";
import LessonType from "@/components/language/lesson-type";
import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import { AppLanguage, LanguageProficienyLevel, LessonTypeDefinition, Topic } from "@/types";
import { useContext } from "react";

export default function Practice() {
  const state = useContext(GlobalContext);

  const topic: Topic = {
    lessonType: LessonTypeDefinition.Genitive,
    title: "Deklination",
    levels: new Set([LanguageProficienyLevel.UpperBeginner]),
    to: "/fr/llll"
  }

  const topicJp: Topic = {
    lessonType: LessonTypeDefinition.Grammar,
    title: "Ni kakawarazu",
    levels: new Set([LanguageProficienyLevel.UpperIntermediary]),
    to: "/fr/llll"
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
