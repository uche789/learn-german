import { useSearchParams } from "react-router-dom";

export default function useOptionSelection(type: 'grammar' | 'vocab' = 'grammar') {
  const searchType = type === 'grammar' ? 'grammarType' : 'vocabType';
  const [searchParams, setSearchParams] = useSearchParams();

  const getClassName = (key: string) => {
    let className = "inline-block rounded-lg border whitespace-nowrap p-2"

    const selected = searchParams.get(searchType);
    if (selected?.includes(key)) {
      className += " border-black"
    }

    return className;
  }

  const onClick = (key: string) => {
    if (searchParams.get(searchType) === key) {
      setSearchParams({ [searchType]: '' })
    } else {
      setSearchParams({ [searchType]: key })
    }
  }

  return {
    getClassName,
    onClick
  }
}