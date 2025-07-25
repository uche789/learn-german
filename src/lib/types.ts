export enum LanguageProficienyLevel {
  Beginner = "Beginner",
  UpperBeginner = "Upper Beginner",
  Intermediary = "Intermediary",
  UpperIntermediary = "Upper Intermediary",
  Advanced = "Advanced",
  Fluent = "Fluent",
}

export enum AppLanguage {
  Japanese = "Japanese",
  German = "German",
  French = "French",
}

export enum LevelLanguage {
  Japanese = AppLanguage.Japanese,
  European = "European",
}

export enum LessonTypeDefinition {
  Grammar = "Grammar",
  Vocab = "Vocabulary",
  Declension = "Declension",
  Genitive = "Genitive",
  Conjunction = "Conjunction",

}

export enum IconType {
  Japanese = AppLanguage.Japanese,
  German = AppLanguage.German,
  French = AppLanguage.French,
  Practice = "Practice",
  ArrowLeft = "ArrowLeft",
  Grammar = "Grammar",
  Vocabulary = "Vocabulary",
  Idioms = "Idioms",
  Chat = "Chat",
  Visibility = "Visibility",
  VisibilityOff = "VisibilityOff",
}

export type ButtonVariant = "primary" | "secondary" | "correct" | "wrong";

export type Topic = {
  id: string;
  lessonType: string;
  title: string;
  subTitle?: string;
  levels: Set<LanguageProficienyLevel>;
  to: string;
  type?: string;
}

export type SupportedLanguages = "fr" | "de" | "jp";

export enum WordType {
  Noun = "Noun",
  Verb = "Verb",
  Adverb = "Adverb",
  Adjective = "Adjective",
  Phrase = "Phrase",
  Conjunction = "Conjunction",
  Interjection = "Interjection",
  Other = "Other"
}

export const Article: Readonly<Record<string, string>> = Object.freeze({
  Feminine: "f",
  Masculine: "m",
  Netural: "m",
  Plural: "p",
})

export type VocabularyType = {
  vocab_id: number;
  definition: string[] | null;
  examples: string[] | null;
  english_translation: string;
  word: string;
  article: string | null;
  word_type: WordType | null;
  language: SupportedLanguages,
  levels: LanguageProficienyLevel[]
}

export type IdiomBase = {
  contentfulMetadata: { concepts: Array<{ id: string }> };
  idiom: string;
  sys: { id: string }
  slug: string
}

export type Idiom = IdiomBase & {
  examples: string;
  meaning: string;
}

export type PostBase = {
  contentfulMetadata: { concepts: Array<{ id: string }> };
  title: string;
  sys: { id: string }
  slug: string
}

export type Post = PostBase & {
  content: {
    json: any
  }
}

export type VocabularyWithTranslation = {
  word: string;
  translation: string;
  language: string;
};