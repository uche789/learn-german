export enum LanguageProficienyLevel {
  Beginner = "Beginner",
  UpperBeginner = "UpperBeginner",
  Intermediary = "Intermediary",
  UpperIntermediary = "UpperIntermediary",
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
  Learn = "Learn",
  Practice = "Practice",
  ArrowLeft = "ArrowLeft",
}

export type ButtonVariant = "primary" | "secondary" | "correct" | "wrong";

export type Topic = {
  id: string;
  lessonType: string;
  title: string;
  levels: Set<LanguageProficienyLevel>;
  to: string;
}

export type SupportedLanguages = "fr" | "de" | "jp";

export enum WordType {
  Noun = "Noun",
  Verb = "Verb",
  Adverb = "Adverb",
  Adjective = "Adjective",
}

export const Gender: Readonly<Record<string, string>> = Object.freeze({
  Feminine: "f",
  Masculine: "m",
  Netural: "m",
  Plural: "p",
})

export type AdminVocabulary = {
  vocab_id: number;
  definition: string[];
  examples: string[];
  english_translation: string;
  word: string;
  gender: string | null;
  word_type: WordType | null;
  language: SupportedLanguages
}

export type IdiomBase = {
  contentfulMetadata: { concepts: Array<{ id: string }> };
  idiom: string;
  sys: { id: string }
}

export type Idiom = IdiomBase & {
  examples: string;
  meaning: string;
}