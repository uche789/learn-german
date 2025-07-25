import useOptionSelection from "@/hooks/useOptionSelection";
import categories from "@/lib/categories";

interface GrammarTypesProps {
  disabled?: boolean
}

export default function GrammarType({ disabled = false }: GrammarTypesProps) {
  const { getClassName, onClick } = useOptionSelection('grammar');

  return <div className="flex overflow-x-auto no-scrollbar *:mr-2">
    {Object.keys(categories.grammar).map((key) => 
      <button
        className={getClassName(key)}
        key={key}
        onClick={() => onClick(key)}
        disabled={disabled}
      >{key}</button>
    )}
  </div>
} 
