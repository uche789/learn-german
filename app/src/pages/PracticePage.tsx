import TopicList from "@/components/topic-list/TopicList";
import { GlobalContext } from "@/context/global";
import HeadingText from "@/components/Heading";
import { AppLanguage, LanguageProficienyLevel, SupportedLanguages, Topic } from "@/lib/types";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import getLangConfig from "@/lib/langConfig";

export default function Practice() {
  const state = useContext(GlobalContext);
  const params = useParams()

  const topics: Record<SupportedLanguages, Topic[]> = {
    de: [
      // {
      //   id: "1",
      //   lessonType: "",
      //   title: "Vocabulary Level 1",
      //   levels: new Set([LanguageProficienyLevel.Beginner, LanguageProficienyLevel.UpperBeginner]),
      //   to: `/${state.langCode}/practice/vocabulary`
      // }
      {
        id: "1",
        lessonType: "",
        title: "Vocabulary",
        levels: new Set([]),
        to: `/${state.langCode}/practice/vocabulary`
      }
    ],
    fr: [],
    jp: [
      {
        id: "1",
        lessonType: "",
        title: "Vocabulary",
        levels: new Set([]),
        to: `/${state.langCode}/practice/vocabulary`
      }
    ]
  }

  if (!topics[getLangConfig(params.lang).langCode].length) return <div className="mt-8 text-center">Your practice list is empty.</div>

  return <article>
    <HeadingText>Practice</HeadingText>
    {
      topics[getLangConfig(params.lang).langCode].length > 0 &&
      <TopicList topics={topics[getLangConfig(params.lang).langCode]} language={state.levelLanguage} />
    }
    
  </article>;
}
