import { ReactNode, createContext, useReducer } from "react";
import { useParams, useRoutes } from "react-router-dom";

export enum GlobalActionType {
  SetLang = "set_lang",
}

export type GlobalAction = {
  type: GlobalActionType;
  payload: { value: string };
};

interface GlobalState {
  lang: string;
}

const initialState: GlobalState = {
  lang: "de",
};

export const GlobalContext = createContext<GlobalState>(initialState);
export const GlobalDispatch = createContext<React.Dispatch<GlobalAction>>(
  () => {},
);

const reducer = (state: GlobalState, action: GlobalAction) => {
  if (action.type === GlobalActionType.SetLang) {
    return { ...state, ...{ lang: action.payload.value } };
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
