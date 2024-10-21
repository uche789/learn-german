import { FormEventHandler, useEffect, useState } from "react"
import { addVocabulary, deleteVocabulary, updatedVocabulary, } from "../lib/api"
import { AdminVocabulary, SupportedLanguages } from "@/types"
import { redirect, useNavigate } from "react-router-dom"

type TextAreaContent = {
  id: string
  value: string
}

const getDefaultTextAreaContent = (): TextAreaContent => ({ id: crypto.randomUUID(), value: ''});

export default function VocabForm({ data, lang = 'de' }: { data?: AdminVocabulary, lang?: SupportedLanguages}) {
  const navigate = useNavigate();
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [definitions, setDefinitions] = useState<TextAreaContent[]>([getDefaultTextAreaContent()])
  const [examples, setExamples] = useState<TextAreaContent[]>([getDefaultTextAreaContent()])
  
  useEffect(() => {
    if (data) {
      setWord(data.word);
      setTranslation(data.english_translation);

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

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const payload: Omit<AdminVocabulary, 'vocab_id'> = {
        definition: definitions.map(d => d.value).filter(val => !!val),
        examples: examples.map(e => e.value).filter(val => !!val),
        english_translation: translation,
        word,
        language: data?.language || lang,
      }
      if (data) {
        await updatedVocabulary(data.vocab_id, payload);
      } else {
        await addVocabulary(payload)
      }
      navigate('/admin')
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


  return <>
    <article>
      <form className="p-4" onSubmit={submit}>
        <fieldset className="border-b pb-5 border-gray-400">
          <legend className="py-5 text-xl font-semibold">Basic data (Mandatory)</legend>
          <div>
            <label className="block font-semibold">Word</label>
            <input
              className="border rounded border-gray-400 p-2"
              type="text"
              defaultValue={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">English translation</label>
            <input
              className="border rounded border-gray-400 p-2"
              type="text"
              defaultValue={translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset className="border-b pb-5 border-gray-400">
          <legend className="py-5 text-xl font-semibold">Definitions</legend>
          <div>
            {definitions.map((definition) => 
              <div className="flex align-center mb-5" key={definition.id}>
                <textarea 
                  className="border p-2"
                  defaultValue={definition.value}
                  onChange={(e) => updatedDefinition(definition.id, e.target.value)}
                />
                <button className="text-red-600 underline ml-4" onClick={() => removeDefinition(definition.id)}>- Remove</button>
              </div>
            )}
            <div className="mt-5">
              <button className="p-2 border rounded border-gray-300" onClick={addDefinition}>+ Add definition</button>
            </div>
          </div>
        </fieldset>
        <fieldset className="border-b pb-5 border-gray-400">
          <legend className="py-5 text-xl font-semibold">Examples</legend>
          <div>
            {examples.map((example) => 
              <div className="flex align-center mb-5" key={example.id}>
                <textarea 
                  className="border p-2"
                  defaultValue={example.value}
                  onChange={(e) => updatedExample(example.id, e.target.value)}
                />
                <button className="text-red-600 underline ml-4" onClick={() => removeExample(example.id)}>- Remove</button>
              </div>
            )}
            <div className="mt-5">
              <button className="p-2 border rounded border-gray-300" onClick={addExample}>+ Add Example</button>
            </div>
          </div>
        </fieldset>
        <div className="flex justify-between mt-12">
          {data && <button className="text-red-600 border-red-600 p-2 border rounded" onClick={remove}>Delete</button>}
          <button type="submit" className="p-2 border rounded bg-blue-500 text-white justify-self-end">Submit</button>
        </div>
      </form>
    </article>
  </>
}