import { AppLanguage, LanguageProficienyLevel, LevelLanguage, Topic } from "@/lib/types";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import LessonType from "../language/lesson-type";
import LevelLabel from "../language/level-label";

export default function TopicList({ topics, language }: { topics: Topic[], language: LevelLanguage }) {
  return (
    <nav
      aria-label="Learn topic list"
    >
      <ul>
        <li>
          {topics.map((topic) =>
            <Link to={topic.to} key={topic.id}>
              <div className="px-8 py-4 border-gray-200 border rounded-xl shadow-md hover:bg-grey-100 w-full">
                <LessonType lessonType={topic.lessonType} />
                <strong dangerouslySetInnerHTML={{__html: topic.title}}/>
                {
                  (!!topic.levels && topic.levels.size > 0) &&
                  <div className="mt-2 *:mr-1">
                    {Array.from(topic.levels).map((level) => <LevelLabel language={language} level={level} key={level} />)}
                  </div>
                }
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}