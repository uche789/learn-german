import { SupportedLanguages } from "@/lib/types";

export default function SwitchLang({ updateLang, value = 'de' }: {
  updateLang: (s: SupportedLanguages) => void,
  value?: SupportedLanguages
}) {

  return <select
    className="p-2 m-4 border rounded"
    defaultValue={value}
    onChange={(e) => updateLang(e.target.value as SupportedLanguages)}
  >
    <option value="de">German</option>
    <option value="fr">French</option>
    <option value="jp">Japanese</option>
  </select>
}