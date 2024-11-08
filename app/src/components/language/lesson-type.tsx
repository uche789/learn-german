import { LessonTypeDefinition } from "@/lib/types";

export default function LessonType({ lessonType }: { lessonType: string }) {
  return (
    <>
      {lessonType && (
        <div
          className="text-pink-medium uppercase text-xs font-semibold"
          aria-label="type of lesson"
          aria-description="grammar, vocab etc."
        >
          {lessonType}
        </div>
      )}
    </>
  );
}
