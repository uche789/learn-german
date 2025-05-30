import { VocabularyType, SupportedLanguages } from "@/lib/types"
import { Link } from "react-router-dom"

export default function AdminViewer({ vocabulary }: { vocabulary: VocabularyType[], lang: SupportedLanguages}) {
  if (vocabulary.length === 0) {
    return <div>You haven't added any vocabulary yet!</div>
  }
  
  return <div>
      {
        vocabulary.map((vocab) =>
          <div key={vocab.vocab_id} className="p-4 mb-2 border bg-gray-50">
            <span className="text-lg font-semibold">{vocab.word}</span> {vocab.article && <span>&#123;{vocab.article}&#125;</span>}
            <p className="italic text-sm">{vocab.word_type}</p>
            <p><strong>Translation:</strong> {vocab.english_translation}</p>
            <span className="uppercase text-xs font-semibold">Definition(s)</span>
            <ol className="list-decimal pl-10">{vocab.definition?.map((def, index) => <li key={index}>{def}</li>)}</ol>
            <span className="uppercase text-xs font-semibold">Example(s)</span>
            <ol className="list-decimal pl-10">{vocab.examples?.map((ex, index) => <li key={index}>{ex}</li>)}</ol>
            
            {vocab.levels.length > 0 && 
            <>
              <span className="uppercase text-xs font-semibold">Levels</span>
              <div>{vocab.levels.join(', ')}</div>
            </>
            }
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