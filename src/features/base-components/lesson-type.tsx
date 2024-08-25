import { AppLanguage, LessonTypeDefinition } from "@/types"

const text: Record<LessonTypeDefinition, string> = {
  [LessonTypeDefinition.Grammar]: 'Grammer',
  [LessonTypeDefinition.Vocab]: 'Vocabulary',
  [LessonTypeDefinition.Declension]: 'Declension',
  [LessonTypeDefinition.Genitive]: 'Genitive case',
  [LessonTypeDefinition.Conjunction]: "Conjunction",
}

export default function LessonType({ type }: { type: LessonTypeDefinition }) {

  return <>
    {type &&
      <div
        className="text-pink-medium uppercase text-xs font-semibold"
        aria-label="type of lesson"
        aria-description="grammar, vocab etc."
      >
        { text[type]}
      </div>
    }
  </>
}