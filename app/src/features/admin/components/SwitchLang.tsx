import { SupportedLanguages } from "@/types";
import { useEffect } from "react";

export default function SwitchLang({ updateLang, value = 'de' }: {
  updateLang: (s: SupportedLanguages) => void,
  value?: SupportedLanguages
}) {
  
  return <select className="p-2 m-4 border rounded" value={value} onChange={(e) => updateLang(e.target.value as SupportedLanguages)}>
    <option value="de">German</option>
    <option value="fr">French</option>
    <option value="jp">Japanese</option>
  </select>
}