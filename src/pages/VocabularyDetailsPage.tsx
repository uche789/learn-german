import ErrorText from "@/components/ErrorText";
import Loading from "@/components/Loading";
import { GlobalContext } from "@/context/global";
import BackPreviousPage from "@/layout/components/BackPreviousPage";
import { useSingleVocabularySlugQuery } from "@/lib/api/vocab";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function VocabularyDetailsPage() {
  const state = useContext(GlobalContext);
  const params = useParams();
  const slug = params.slug?.split('_')[1] || '';
  const { data, isLoading, error } = useSingleVocabularySlugQuery(slug, state.langCode);

  if (isLoading) return <Loading />
  if (error) return <ErrorText text="vocabulary" />

  return (
    <div>
      {data && <>
        <BackPreviousPage text="Vocabulary" />
        <h1 className="text-2xl font-semibold mb-4">{data.word} <span>{data.article}</span></h1>
        <p className="italic text-sm">{data.word_type}</p>
        <p className="my-4">{data.english_translation}</p>
        {!!data.definition?.length && <>
          <h2 className="text-lg font-semibold">Definition(s)</h2>
          <ol className="list-decimal pl-10">{data.definition?.map((def, index) => <li key={index}>{def}</li>)}</ol>
        </>}
        {!!data.examples?.length && <>
          <h2 className="text-lg font-semibold">Example(s)</h2>
          <ol className="list-decimal pl-10">{data.examples?.map((ex, index) => <li key={index}>{ex}</li>)}</ol>
        </>}
      </>}
    </div>
  );
}
