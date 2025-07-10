import useOptionSelection from "@/hooks/useOptionSelection";
import { WordType } from "@/lib/types";

interface VocabTypesProps {
  disabled?: boolean
}

export default function VocabType({ disabled = false }: VocabTypesProps) {
  const { getClassName, onClick } = useOptionSelection('vocab');

  return <div className="flex overflow-x-auto no-scrollbar *:mr-2">
    {Object.keys(WordType).map((key) => 
      <button
        className={getClassName(key)}
        key={key}
        onClick={() => onClick(key)}
        disabled={disabled}
      >{key}</button>
    )}
  </div>
} 
