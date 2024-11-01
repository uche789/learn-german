import BackPreviousPage from "@/features/layout/components/BackPreviousPage";
import Heading from "@/features/layout/components/Heading";
import { getFile, getVocab } from "@/features/vocabulary/lib/api";
import { AdminVocabulary } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VocabularyDetailsPage() {
  const [data, setData] = useState<AdminVocabulary>()
  const params = useParams()

  useEffect(() => {
    async function fetchData() {
      const slug = params.slug?.split('_')[1] || '';
      const result = await getVocab(slug, params.lang || 'de');
      setData(result);
    }

    fetchData()
  }, [])

  return (
    <div>
      {data && <>
        <BackPreviousPage text="Vocabulary" />
        <h1 className="text-2xl font-semibold mb-4">{data.word} <span>{data.gender}</span></h1>
        <p className="italic text-sm">{data.word_type}</p>
        <p className="my-4">{data.english_translation}</p>
        {!!data.definition.length && <>
          <h2 className="text-lg font-semibold">Definition(s)</h2>
          <ol className="list-decimal pl-10">{data.definition.map((def, index) => <li key={index}>{def}</li>)}</ol>
        </>}
        {!!data.examples.length && <>
          <h2 className="text-lg font-semibold">Example(s)</h2>
          <ol className="list-decimal pl-10">{data.examples.map((ex, index) => <li key={index}>{ex}</li>)}</ol>
        </>}
      </>}
    </div>
  );
}
