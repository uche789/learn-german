import { AppLanguage, LevelLanguage, SupportedLanguages } from "./types";

const languages: Record<SupportedLanguages, AppLanguage> = {
  fr: AppLanguage.French,
  de: AppLanguage.German,
  jp: AppLanguage.Japanese
}

export default function getLangConfig(langCode = 'de') {
  const language = languages[langCode as SupportedLanguages]
  return { 
    langCode: langCode as SupportedLanguages,
    language: language,
    levelLanguage: langCode !== 'jp' ? LevelLanguage.European : language as unknown as LevelLanguage,
  }
} 