import { Word } from "@/App";
import SelectItem from "@/components/select-item/SelectItem";
import Card from "@/features/card/Card";
import Switcher from "@/features/switcher/Switcher";
import { IconType } from "@/types";
import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import AppHeader from "./app-header/AppHeader";
import AppNav from "./app-nav/AppNav";
import dictionary from "@/assets/english-german.json";
import DropDownMenu from "@/components/dropdown/dropdown";
import { GlobalActionType, GlobalDispatch } from "@/context/global";

export default function Layout() {
  const params = useParams();
  const dispatch = useContext(GlobalDispatch);
  useEffect(() => {
    dispatch({
      type: GlobalActionType.SetLang,
      payload: { value: params?.lang || "de" },
    });
  });
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandonWord = (): Word => {
    const wordKeys = Object.keys(dictionary);
    const index = getRandomInt(wordKeys.length);
    const english = wordKeys[index];
    const german = (dictionary as Record<string, string>)[english];
    const newWord: Word = {
      german,
      english,
    };
    return newWord;
  };

  const [word, setWord] = React.useState<Word>(getRandonWord());

  const onSwitch = () => {
    setWord(getRandonWord());
  };

  const clickHander = (value: string) => {
    console.log(value);
  };
  const supportedLanguages = ["de", "fr", "jp"];
  return supportedLanguages.includes(params?.lang || "") ? (
    <>
      <AppHeader />
      <main className="max-w-screen-lg w-full px-4 m-auto pt-24">
        <AppNav />
        <Outlet />
        <div className="wrapper">
          <Card word={word} />
          <Switcher onSwitch={onSwitch} />
          <DropDownMenu
            clickHandler={clickHander}
            options={[
              { label: "first", value: "first" },
              { label: "second", value: "second" },
            ]}
            linkName="Hover me"
            selected="first"
          />
          <SelectItem
            label="C1 level"
            icon={IconType.French}
            isBolded={true}
            onClick={() => {}}
          />
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/error" replace />
  );
  // <Route path=":/lang/*" element={} />
}
