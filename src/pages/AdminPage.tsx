import AdminHeader from "@/features/admin/components/AdminHeader";
import AdminViewer from "@/features/admin/components/AdminViewer";
import SwitchLang from "@/features/admin/components/SwitchLang";
import { getVocabulary, startAuth } from "@/lib/api/vocab";
import { VocabularyType, SupportedLanguages } from "@/lib/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [lang, setLang] = useState<SupportedLanguages>('de')
  const [data, setData] = useState<VocabularyType[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    startAuth()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setData(await getVocabulary(lang, query))
    }

    fetchData();
  }, [lang, query])

  const onLanguageSwitch = (lang: SupportedLanguages) => {
    setQuery('');
    setLang(lang);
  }

  return <>
    <AdminHeader title="Manage vocabulary" />
    <main className="w-full max-w-3xl m-auto px-4">
      <>
        <SwitchLang updateLang={onLanguageSwitch} />
        <Link to={{ pathname: '/admin/vocab/form', search: `lang=${lang}` }}>
          <span className="p-2 border rounded bg-blue-500 text-white">Add vocabulary</span>
        </Link>
        <div className="mb-5">
          <input
            type="text" className="p-2 border border-gray-400 rounded w-full"
            placeholder="Search word"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <AdminViewer vocabulary={data} lang={lang} />
      </>
    </main>

  </>
}