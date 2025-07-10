import { FormEventHandler, useEffect, useState } from "react"
import { VocabularyType, Article, LanguageProficienyLevel, SupportedLanguages, WordType } from "@/lib/types"
import { useNavigate } from "react-router-dom"
import { updatedVocabulary, addVocabulary, deleteVocabulary } from "@/lib/api/vocab"

type TextAreaContent = {
  id: string
  value: string
}

const getDefaultTextAreaContent = (): TextAreaContent => ({ id: crypto.randomUUID(), value: ''});

export default function VocabForm({ data, lang = 'de' }: { data?: VocabularyType, lang?: SupportedLanguages}) {
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState<TextAreaContent[]>([getDefaultTextAreaContent()])
  const [examples, setExamples] = useState<TextAreaContent[]>([getDefaultTextAreaContent()])
  
  useEffect(() => {
    if (data) {
      if (data.definition && data.definition.length) {
        setDefinitions(data.definition.map((definition) => ({ id: crypto.randomUUID(), value: definition })))
      }

      if (data.examples && data.examples.length) {
        setExamples(data.examples.map((example) => ({ id: crypto.randomUUID(), value: example })))
      }
    }
  }, [data])

  const addDefinition: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDefinitions([...definitions, getDefaultTextAreaContent()]);
  }
  const addExample: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setExamples([...examples, getDefaultTextAreaContent()]);
  }

  const removeDefinition = (id: string) => {
    setDefinitions(definitions.filter(example => example.id !== id));
  }
  const removeExample = (id: string) => {
    setExamples(examples.filter(example => example.id !== id));
  }

  const updatedDefinition = (id: string, value: string) => {
    const updated = definitions.map((definition) => {
      if (definition.id === id) {
        return {id, value};
      }

      return definition;
    })

    setDefinitions(updated);
  }
  const updatedExample = (id: string, value: string) => {
    const updated = examples.map((example) => {
      if (example.id === id) {
        return {id, value};
      }

      return example;
    })

    setExamples(updated);
  }

  const submitAction: FormEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault()
    try {
      const formData = new FormData(formEvent.currentTarget)
      const payload: Omit<VocabularyType, 'vocab_id'> = {
        definition: definitions.map(d => d.value).filter(val => !!val),
        examples: examples.map(e => e.value).filter(val => !!val),
        english_translation: formData.get('translation') as string,
        word: formData.get('word') as string,
        language: data?.language || lang,
        article: formData.get('article') as string || null,
        word_type: formData.get('word_type') as WordType,
        levels: formData.getAll('levels') as LanguageProficienyLevel[]
      }
      if (data) {
        await updatedVocabulary(data.vocab_id, payload);
      } else {
        await addVocabulary(payload)
      }
      navigate(`/admin?lang=${lang}`)
    } catch (ex) {
      alert('An error occurred: ' + (ex as Error).message)
    }
  }

  const remove: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!data?.vocab_id) return;
    try {
      await deleteVocabulary(data.vocab_id);
      navigate('/admin')
    } catch {
      alert('An error occurred');
    }
  }

  const cancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(`/admin?lang=${lang}`);
  }

  const inputClasses = 'border rounded border-gray-400 p-2 w-full';
  const fieldSetClasses = 'border-b pb-5 border-gray-400';
  const textAreaDefinition = [
    {content: definitions, update: updatedDefinition, remove: removeDefinition, title: 'Definitions', suffix: 'definition', add: addDefinition},
    {content: examples, update: updatedExample, remove: removeExample, title: 'Examples', suffix: 'example', add: addExample}
  ]

  return <>
    <article className="max-w-md">
      <form className="p-4" onSubmit={submitAction}>
        <fieldset className={fieldSetClasses}>
          <legend className="py-5 text-xl font-semibold">Basic data (Mandatory)</legend>
          <div>
            <label className="block font-semibold">Word</label>
            <input
              className={inputClasses}
              type="text"
              defaultValue={data?.word || ''}
              name="word"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">English translation</label>
            <input
              className={inputClasses}
              type="text"
              defaultValue={data?.english_translation || ''}
              name="translation"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Word type</label>
            <select className={inputClasses} style={{minWidth: '195px'}} name="word_type" defaultValue={data?.word_type || ''}>
              {Object.keys(WordType).map(aType => <option value={(WordType as Record<string, string>)[aType]} key={aType}>{aType}</option>)}
            </select>
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Article</label>
            <select className={inputClasses} style={{minWidth: '195px'}} name="article" defaultValue={data?.article || ''}>
              <option value="">None</option>
              {Object.keys(Article).map(aArticle => <option value={Article[aArticle]} key={aArticle}>{aArticle}</option>)}
            </select>
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Levels</label>
            <select 
              multiple 
              className={inputClasses}
              style={{minWidth: '195px'}}
              defaultValue={data?.levels || []}
              name="levels"
              required
            >
              {Object.values(LanguageProficienyLevel).map(level => <option value={level} key={level}>{level}</option>)}
            </select>
          </div>
        </fieldset>
        { textAreaDefinition.map((item) => 
          <fieldset className={fieldSetClasses} key={item.suffix}>
            <legend className="py-5 text-xl font-semibold">{item.title}</legend>
            <div>
              {item.content.map((content) => 
                <div className="flex align-center mb-5" key={content.id}>
                  <textarea 
                    className="border p-2 w-full"
                    defaultValue={content.value}
                    onChange={(e) => item.update(content.id, e.target.value)}
                  />
                  <button className="text-red-600 underline ml-4 text-smc" onClick={() => item.remove(content.id)}>Remove</button>
                </div>
              )}
              <div className="mt-5">
                <button className="p-2 border rounded border-gray-300" onClick={item.add}>+ Add {item.suffix}</button>
              </div>
            </div>
          </fieldset>
        )}
        <div className="flex justify-between mt-12">
          {data && <button className="text-red-600 border-red-600 p-2 border rounded" onClick={remove}>Delete</button>}
          <button className="p-2 mr-2 border rounded" onClick={cancel}>Cancel</button>
          <button type="submit" className="p-2 border rounded bg-blue-500 text-white">Submit</button>
        </div>
      </form>
    </article>
  </>
}