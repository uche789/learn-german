import { LevelLanguage, Topic } from "@/lib/types";
import { Link } from "react-router-dom";
import LessonType from "../language/lesson-type";
import LevelLabel from "../language/level-label";

export default function TopicList({ topics, language }: { topics: Topic[], language: LevelLanguage }) {
  return (
    <nav
      aria-label="Learn topic list"
    >
      <ul>
        {topics.map((topic) =>
          <li className="mb-4" key={topic.id}>
            <Link to={topic.to}>
              <div className="px-8 py-4 border-gray-200 border rounded-xl shadow-md hover:bg-grey-100 w-full">
                <LessonType lessonType={topic.lessonType} />
                <strong>{topic.title}</strong>
                {topic.subTitle && <p>{topic.subTitle}</p>}
                {
                  (!!topic.levels && topic.levels.size > 0) &&
                  <div className="mt-2 *:mr-1">
                    {Array.from(topic.levels).map((level) => <LevelLabel language={language} level={level} key={level} />)}
                  </div>
                }
              </div>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}