import AdminViewer from "@/features/admin/components/AdminViewer";
import SwitchLang from "@/features/admin/components/SwitchLang";
import { getVocabulary } from "@/features/admin/lib/api";
import { AdminVocabulary, SupportedLanguages } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VocabAmin() {
  const [lang, setLang] = useState<SupportedLanguages>('de')
  const [data, setData] = useState<AdminVocabulary[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!window.location.origin.includes('http://localhost')) {
      setError(true);
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      setData(await getVocabulary(lang))
    }

    fetchData();
  }, [lang])

  return <>
    <header><h1 className="text-xl m-4 font-semibold text-center">Manage vocabulary</h1></header>
    <main className="w-full max-w-3xl m-auto">
      {
        error ?
          <p>Ops, you cannot access this page</p>
          :
          <>
            <SwitchLang updateLang={(lang: SupportedLanguages) => setLang(lang)} />
            <Link to={{ pathname: '/admin/vocab/form', search: `lang=${lang}`}}>
              <span className="p-2 border rounded bg-blue-500 text-white">Add vocabulary</span>
            </Link>
            <AdminViewer vocabulary={data} lang={lang} />
          </>
      }
    </main>

  </>
}