import { AppLanguage, LanguageProficienyLevel, LevelLanguage, Topic } from "@/lib/types";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import LessonType from "../language/lesson-type";
import LevelLabel from "../language/level-label";

export default function TopicList({ topics, language }: { topics: Topic[], language: LevelLanguage }) {
  const goTo = (path: string) => {

  }

  return (
    <nav
      aria-label="Learn topic list"
    >
      <ul>
        <li>
          {topics.map((topic) =>
            <Link to={topic.to} key={topic.to}>
              <div className="px-8 py-4 border-gray-200 border rounded-xl shadow-md hover:bg-grey-100 sm:w-full md:w-3/4">
                <LessonType type={topic.lessonType} />
                <strong>{topic.title}</strong>
                {Array.from(topic.levels).map((level) => <LevelLabel language={language} level={level} key={level} />)}
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}