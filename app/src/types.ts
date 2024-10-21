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
  Japanese = "Japanese",
  German = "German",
  French = "French",
  Learn = "Learn",
  Practice = "Practice",
  ArrowLeft = "ArrowLeft",
}

export type ButtonVariant = "primary" | "secondary" | "correct" | "wrong";

export type Topic = {
  lessonType: LessonTypeDefinition;
  title: string;
  levels: Set<LanguageProficienyLevel>;
  to: string;
}

export type SupportedLanguages = "fr" | "de" | "jp";

export type AdminVocabulary = {
  vocab_id: number;
  definition: string[];
  examples: string[];
  english_translation: string;
  word: string;
  language: SupportedLanguages
}