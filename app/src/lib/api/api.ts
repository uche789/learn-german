import { AppLanguage, Idiom, IdiomBase, LanguageProficienyLevel, Post, PostBase, SupportedLanguages, Topic } from "../types";
import { idiomQuery, idiomsCollectionQuery, postCollectionQuery, postQuery } from "./queries";
import remarkHtml from "remark-html";
import { remark } from "remark";
import GeneralError from "./errors/GeneralError";
import GraphQLError from "./errors/GraphQLError";
import categories, { categoriesAlt } from "../categories";
import NotFound from "./errors/NotFound";

const BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_APP_SPACE_ID}/environments/master`

async function fetchData(query: string) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`,
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

export const getIdiom = async (id: string) => {
  const query = idiomQuery(id);
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

export const getPost = async (id: string) => {
  const query = postQuery(id);
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