import TopicList from "@/components/topicList/TopicList";
import { GlobalContext } from "@/context/global";
import HeadingText from "@/features/layout/components/Heading";
import { LanguageProficienyLevel, Topic } from "@/lib/types";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Practice() {
  const state = useContext(GlobalContext);

  const topics: Topic[] = [
    {
      id: "1",
      lessonType: "",
      title: "Vocabulary Level 1",
      levels: new Set([LanguageProficienyLevel.Beginner, LanguageProficienyLevel.UpperBeginner]),
      to: `/${state.langCode}/practice/vocabulary`
    }
  ]

  return <article>
    <HeadingText>Practice</HeadingText>
    <TopicList topics={topics} language={state.levelLanguage} />
  </article>;
}
