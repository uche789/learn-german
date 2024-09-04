import { GlobalContext } from "@/context/global";
import { useContext } from "react";

export default function Practice() {
  const state = useContext(GlobalContext);

  const translations: Record<PropertyKey, string> = {
    de: "Lernen",
    fr: "Aprends",
    jp: "Narau",
  };
  return <div>{translations[state.lang]}</div>;
}
