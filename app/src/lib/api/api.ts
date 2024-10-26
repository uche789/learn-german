import { Idiom, Topic } from "../types";
import { idiomsCollectionQuery, postCollectionQuery } from "./queries";
import remarkHtml from "remark-html";
import { remark } from "remark";
import GeneralError from "./errors/GeneralError";
import GraphQLError from "./errors/GraphQLError";

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

export const getPostCollection = async (ids: string[]) => {
  const query = postCollectionQuery(ids);
  const { data, error } = await fetchData(query);

  return data;
}

export const getIdiomsCollection = async (ids: string[]) => {
  const query = idiomsCollectionQuery(ids);
  const { data, error } = await fetchData(query);

  if (error) {
    throw new GraphQLError(error)
  }

  const result: Topic[] = [];

  (data.idiomsCollection.items as Idiom[]).forEach(async (item) => {
    const idiom = (await remark().use(remarkHtml).process(item.idiom)).value as string;
    result.push({
      title: idiom,
      id: item.sys.id,
      lessonType: "Idioms",
      levels: undefined,
      to: ""
    })
    // item.examples = (await remark().use(remarkHtml).process(item.examples)).value as string;
    // item.meaning = (await remark().use(remarkHtml).process(item.meaning)).value as string;

  })

  return data;
}