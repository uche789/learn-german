import NotFound from "@/lib/api/errors/NotFound";
import { AdminVocabulary, SupportedLanguages, Topic } from "@/lib/types";

export const getFile = async (langCode: string) => {
  const response = await fetch(`/${langCode}.json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new NotFound()
  }

  return response.json();
}

export const getTopics = async (langCode: string): Promise<Topic[]> => {
  const data = await getFile(langCode);
  const topics: Topic[] = [];

  (data as AdminVocabulary[]).forEach((vocab) => {
    topics.push({
      to: `/${langCode}/vocabulary/${vocab.word_type}_${vocab.word}`,
      id: String(vocab.vocab_id),
      lessonType: "",
      title: vocab.word,
      subTitle: vocab.english_translation,
      levels: new Set(vocab.levels)
    })
  })
  return topics;
}

export const getVocab = async (word: string, langCode: string): Promise<AdminVocabulary | voic> => {
  const result = await getFile(langCode);

  return (result as AdminVocabulary[]).find(r => r.word === word);
}