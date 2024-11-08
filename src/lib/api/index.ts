import { VocabularyType, AppLanguage, Idiom, IdiomBase, LanguageProficienyLevel, Post, PostBase, SupportedLanguages, Topic } from "../types";
import { idiomQuery, idiomsCollectionQuery, postCollectionQuery, postQuery } from "./queries";
import remarkHtml from "remark-html";
import { remark } from "remark";
import GeneralError from "./errors/GeneralError";
import GraphQLError from "./errors/GraphQLError";
import categories, { categoriesAlt } from "../categories";
import NotFound from "./errors/NotFound";
import config from "../config";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${config.spaceId}/environments/master`

async function fetchData(query: string) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new GeneralError()
  }

  const { data, error } = await response.json();

  return {
    data, error
  }
}

/* -------------- GRAMMAR ----------------- */

export const getPostCollection = async (ids: string[], langCode: SupportedLanguages) => {
  const query = postCollectionQuery(ids);
  const { data, error } = await fetchData(query);

  if (error) {
    throw new GraphQLError(error)
  }

  const result: Topic[] = [];

  (data.postCollection.items as PostBase[]).forEach(async (item) => {
    const levels: LanguageProficienyLevel[] = [];
    const foundLessonType = item.contentfulMetadata.concepts.find((concept) => categoriesAlt.grammar[concept.id]);
    const lessonType = categoriesAlt.grammar[foundLessonType?.id || ''] ||  'Grammar';
    item.contentfulMetadata.concepts.forEach((concept) => {
      if (categoriesAlt["language levels"][concept.id]) {
        levels.push(categoriesAlt["language levels"][concept.id] as LanguageProficienyLevel)
      }
    })

    result.push({
      id: item.sys.id,
      title: item.title,
      lessonType: lessonType,
      levels: new Set(levels),
      to: `/${langCode}/grammar/${item.slug}`
    })

  })

  return result;
}

export const getPost = async (slug: string, language: AppLanguage) => {
  const languageId = categories.languages[language];
  const query = postQuery(slug, languageId);
  const { data, error } = await fetchData(query);

  if (error) {
    throw new GraphQLError(error)
  }

  if (error) {
    throw new NotFound()
  }

  const item = data.postCollection.items[0] as Post;
  return item;
}

/* -------------- GRAMMAR ----------------- */

export const getIdiomsCollection = async (ids: string[], langCode: SupportedLanguages, language: AppLanguage) => {
  const query = idiomsCollectionQuery([...ids, categories.languages[language]]);
  const { data, error } = await fetchData(query);

  if (error) {
    throw new GraphQLError(error)
  }

  const result: Topic[] = [];

  (data.idiomsCollection.items as IdiomBase[]).forEach(async (item) => {
    const levels: LanguageProficienyLevel[] = [];
    item.contentfulMetadata.concepts.forEach((concept) => {
      if (categoriesAlt["language levels"][concept.id]) {
        levels.push(categoriesAlt["language levels"][concept.id] as LanguageProficienyLevel)
      }
    })
    result.push({
      id: item.sys.id,
      title: item.idiom,
      lessonType: "Idioms",
      levels: new Set(levels),
      to: `/${langCode}/idiom/${item.slug}`
    })

  })

  return result;
}

export const getIdiom = async (slug: string, language: AppLanguage) => {
  const languageId = categories.languages[language];
  const query = idiomQuery(slug, languageId);
  const { data, error } = await fetchData(query);

  if (error) {
    throw new GraphQLError(error)
  }

  if (error) {
    throw new NotFound()
  }

  const item = data.idiomsCollection.items[0] as Idiom;
  item.examples = (await remark().use(remarkHtml, { sanitize: true }).process(item.examples)).value as string;
  item.meaning = (await remark().use(remarkHtml, { sanitize: true }).process(item.meaning)).value as string;

  return item;
}

/* -------------- VOCABULARY ----------------- */

export const getVocabFile = async (langCode: string) => {
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

export const getVocabularyList = async (langCode: string): Promise<VocabularyType[]> => {
  const data = await getVocabFile(langCode);
  return data as VocabularyType[];
}

export const getVocabulary = async (word: string, langCode: string): Promise<VocabularyType | undefined> => {
  const result = await getVocabFile(langCode);

  return (result as VocabularyType[]).find(r => r.word === word);
}

/*----------- TANSTACK QUERIES -----------------*/

export const useVocabularyQuery = (langCode: string) => {
  return useQuery({
    queryKey: ['vocabulary', langCode],
    queryFn: () => getVocabularyList(langCode),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export const useSingleVocabularyQuery = (word: string, langCode: string) => {
  return useQuery({
    queryKey: ['vocabulary', word, langCode],
    queryFn: () => getVocabulary(word, langCode),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export const useIdiomCollectionQuery = (ids: string[], langCode: SupportedLanguages, language: AppLanguage) => {
  return useQuery({
    queryKey: ['idioms', ids, langCode, language],
    queryFn: () => getIdiomsCollection(ids, langCode, language),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}

//TODO: restrict by language as well
export const useIdiomQuery = (slug: string, language: AppLanguage) => {
  return useQuery({
    queryKey: ['idioms', slug, language],
    queryFn: () => getIdiom(slug, language),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}

export const useGrammarCollectionQuery = (ids: string[], langCode: SupportedLanguages) => {
  return useQuery({
    queryKey: ['posts', ids, langCode],
    queryFn: () => getPostCollection(ids, langCode),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}

//TODO: restrict by language as well
export const useGrammarQuery = (slug: string, language: AppLanguage) => {
  return useQuery({
    queryKey: ['posts', slug, language],
    queryFn: () => getPost(slug, language),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}