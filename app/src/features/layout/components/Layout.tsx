import { Word } from "@/App";
import SelectItem from "@/components/select-item/SelectItem";
import Card from "@/features/card/Card";
import Switcher from "@/features/switcher/Switcher";
import { IconType, SupportedLanguages } from "@/lib/types";
import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import AppHeader from "./app-header/AppHeader";
import AppNav from "./app-nav/AppNav";
import DropDownMenu from "@/components/dropdown/dropdown";
import { GlobalActionType, GlobalDispatch } from "@/context/global";
import AppFooter from "./app-footer/AppFooter";

export default function Layout() {
  const params = useParams();
  const dispatch = useContext(GlobalDispatch);
  useEffect(() => {
    dispatch({
      type: GlobalActionType.SetLang,
      payload: { value: params?.lang as SupportedLanguages || "de" },
    });
  }, [dispatch]);

  const clickHander = (value: string) => {
    console.log(value);
  };
  const supportedLanguages: SupportedLanguages[] = ["de", "fr", "jp"];
  return (supportedLanguages as string[]).includes(params?.lang || "") ? (
    <>
      <AppHeader />
      <main className="max-w-screen-md w-full px-4 m-auto pt-24">
        <Outlet />
        <div className="wrapper">
          <SelectItem
            label="C1 level"
            icon={IconType.French}
            isBolded={true}
            onClick={() => {}}
          />
        </div>
      </main>
      <AppFooter />
    </>
  ) : (
    <Navigate to="/error" replace />
  );
}
