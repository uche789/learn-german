import SwitchLang from "@/features/admin/components/SwitchLang";
import VocabFileUpload from "@/features/admin/components/VocabFileUpload";
import VocabForm from "@/features/admin/components/VocabForm";
import { getVocabularyById } from "@/features/admin/lib/api";
import { AdminVocabulary, SupportedLanguages } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function VocabFormAmin() {
  const [lang, setLang] = useState<SupportedLanguages>('de')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AdminVocabulary>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!window.location.origin.includes('http://localhost')) {
      setError(true);
    }

  }, [])

  useEffect(() => {
    async function fetchData(vocab_id: number) {
      setLoading(true)
      setData(await getVocabularyById(vocab_id))
      setLoading(false)
    }

    setLang(searchParams.get('lang') as SupportedLanguages)
    const id = searchParams.get('id')
    if (id) {
      fetchData(Number(id));
    }
  }, [])

  return <>
    <header><h1 className="text-xl m-4 font-semibold text-center">Manage vocabulary</h1></header>
    <main className="w-full max-w-3xl m-auto">
      {
        error ?
          <p>Ops, you cannot access this page</p>
          :
          <>
            
            {!loading && <>
              {!data && 
                <>
                  <VocabFileUpload />
                  <p className="text-center mt-5 font-semibold">OR</p>
                  <SwitchLang value={lang} updateLang={(lang: SupportedLanguages) => setLang(lang)} />
                </>
              }
              <VocabForm data={data} lang={lang} />
            </>
            }
          </>
      }
    </main>
  </>

}