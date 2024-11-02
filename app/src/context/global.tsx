import { AppLanguage, LevelLanguage, SupportedLanguages } from "@/lib/types";
import { ReactNode, createContext, useReducer } from "react";

const languages: Record<SupportedLanguages, AppLanguage> = {
  fr: AppLanguage.French,
  de: AppLanguage.German,
  jp: AppLanguage.Japanese
}

export enum GlobalActionType {
  SetLang = "set_lang",
}

export type GlobalAction = {
  type: GlobalActionType.SetLang;
  payload: { value: SupportedLanguages };
};

interface GlobalState {
  langCode: SupportedLanguages;
  language: AppLanguage;
  levelLanguage: LevelLanguage;
}

const initialState: GlobalState = {
  langCode: "de",
  language: AppLanguage.German,
  levelLanguage: LevelLanguage.European
};

export const GlobalContext = createContext<GlobalState>(initialState);
export const GlobalDispatch = createContext<React.Dispatch<GlobalAction>>(
  () => {},
);

const reducer = (state: GlobalState, action: GlobalAction) => {
  if (action.type === GlobalActionType.SetLang) {
    const language = languages[action.payload.value];
    return { ...state, ...{ 
      langCode: action.payload.value,
      language: languages[action.payload.value],
      levelLanguage: action.payload.value !== 'jp' ? LevelLanguage.European : language as unknown as LevelLanguage,
    }};
  }

  throw new Error("Invalid Action");
};

export default function GlobalStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatch.Provider value={dispatch}>
        {children}
      </GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
}
