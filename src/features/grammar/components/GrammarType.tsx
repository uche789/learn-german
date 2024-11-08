import categories from "@/lib/categories";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

interface GrammarTypesProps { 
}

export default function GrammarType() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const getClassName = (key: string) => {
    let className = "inline-block rounded-lg border whitespace-nowrap p-2"

    const selected = searchParams.get('grammarType');
    if (selected?.includes(key)) {
      className += " border-black"
    }

    return className;
  }

  const onClick = (key: string) => {
    if (searchParams.get('grammarType') === key) {
      setSearchParams({grammarType: ''})
    } else {
      setSearchParams({grammarType: key})
    }
  }

  return <div className="flex overflow-x-auto no-scrollbar *:mr-2">
    {Object.keys(categories.grammar).map((key) => 
      <button
        className={getClassName(key)}
        key={key}
        onClick={() => onClick(key)}
      >{key}</button>
    )}
  </div>
} 
