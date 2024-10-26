import { useEffect, useState } from "react"
import { getVocabulary } from "../lib/api"
import { AdminVocabulary, SupportedLanguages } from "@/lib/types"
import { Link } from "react-router-dom"

export default function AdminViewer({ vocabulary, lang }: { vocabulary: AdminVocabulary[], lang: SupportedLanguages}) {
  return <div>
      {
        vocabulary.map((vocab) =>
          <div key={vocab.vocab_id} className="p-4 mb-2 border bg-gray-50">
            <span className="text-lg font-semibold">{vocab.word}</span> {vocab.gender && <span>&#123;{vocab.gender}&#125;</span>}
            <p className="italic text-sm">{vocab.word_type}</p>
            <p><strong>Translation:</strong> {vocab.english_translation}</p>
            <span className="uppercase text-xs font-semibold">Definitions</span>
            <ol className="list-decimal pl-10">{vocab.definition.map((def, index) => <li key={index}>{def}</li>)}</ol>
            <span className="uppercase text-xs font-semibold">Examples</span>
            <ol className="list-decimal pl-10">{vocab.examples.map((ex, index) => <li key={index}>{ex}</li>)}</ol>
            <div className="flex justify-end">
              <Link
                to={{ pathname: '/admin/vocab/form', search: `id=${vocab.vocab_id}` }}
              >
                <span className="mt-1 mr-5 underline">Edit</span>
              </Link>
            </div>
          </div>
        )
      }
  </div>
}