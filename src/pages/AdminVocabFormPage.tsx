import AdminHeader from "@/features/admin/components/AdminHeader";
import VocabFileUpload from "@/features/admin/components/VocabFileUpload";
import VocabForm from "@/features/admin/components/VocabForm";
import { startAuth, getVocabularyById } from "@/lib/api/vocab";
import { VocabularyType, SupportedLanguages } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdminVocabFormPage() {
  const [lang, setLang] = useState<SupportedLanguages>('de')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<VocabularyType>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    startAuth()
  }, [])

  useEffect(() => {
    async function fetchData(vocab_id: number) {
      setLoading(true)
      setData(await getVocabularyById(vocab_id))
      setLoading(false)
    }

    if (searchParams.has('lang')) {
      setLang(searchParams.get('lang') as SupportedLanguages)
    }
    const id = searchParams.get('id')
    if (id) {
      fetchData(Number(id));
    }
  }, [])

  return <>
    <AdminHeader title="Manage vocabulary" />
    <main className="w-full max-w-3xl m-auto px-4">
      <>
        {!loading && <>
          {!data &&
            <>
              <VocabFileUpload />
              <p className="text-center mt-5 font-semibold">OR</p>
            </>
          }
          <VocabForm data={data} lang={lang} />
        </>
        }
      </>
    </main>
  </>

}