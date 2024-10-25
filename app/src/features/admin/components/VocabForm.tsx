import { FormEventHandler, useEffect, useState } from "react"
import { addVocabulary, deleteVocabulary, updatedVocabulary, } from "../lib/api"
import { AdminVocabulary, Gender, SupportedLanguages, WordType } from "@/types"
import { useNavigate } from "react-router-dom"
import { title } from "process"

type TextAreaContent = {
  id: string
  value: string
}

const getDefaultTextAreaContent = (): TextAreaContent => ({ id: crypto.randomUUID(), value: ''});

export default function VocabForm({ data, lang = 'de' }: { data?: AdminVocabulary, lang?: SupportedLanguages}) {
  const navigate = useNavigate();
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [wordType, setWordType] = useState<WordType>(WordType.Noun)
  const [gender, setGender] = useState<string | null>(null)
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
        gender: gender || null,
        word_type: wordType
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

  const inputClasses = 'border rounded border-gray-400 p-2';
  const fieldSetClasses = 'border-b pb-5 border-gray-400';
  const textAreaDefinition = [
    {content: definitions, update: updatedDefinition, remove: removeDefinition, title: 'Definitions', suffix: 'definition', add: addDefinition},
    {content: examples, update: updatedExample, remove: removeExample, title: 'Examples', suffix: 'example', add: addExample}
  ]

  return <>
    <article>
      <form className="p-4" onSubmit={submit}>
        <fieldset className={fieldSetClasses}>
          <legend className="py-5 text-xl font-semibold">Basic data (Mandatory)</legend>
          <div>
            <label className="block font-semibold">Word</label>
            <input
              className={inputClasses}
              type="text"
              defaultValue={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">English translation</label>
            <input
              className={inputClasses}
              type="text"
              defaultValue={translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Word type</label>
            <select className={inputClasses} style={{minWidth: '195px'}} onChange={(e) => setGender(e.target.value)}>
              {Object.keys(WordType).map(aType => <option value={(WordType as Record<string, string>)[aType]}>{aType}</option>)}
            </select>
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Gender</label>
            <select className={inputClasses} style={{minWidth: '195px'}} onChange={(e) => setGender(e.target.value)}>
              <option value="">None</option>
              {Object.keys(Gender).map(aGender => <option value={Gender[aGender]}>{aGender}</option>)}
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
                    className="border p-2"
                    defaultValue={content.value}
                    onChange={(e) => item.update(content.id, e.target.value)}
                  />
                  <button className="text-red-600 underline ml-4" onClick={() => item.remove(content.id)}>- Remove</button>
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
          <button type="submit" className="p-2 border rounded bg-blue-500 text-white justify-self-end">Submit</button>
        </div>
      </form>
    </article>
  </>
}