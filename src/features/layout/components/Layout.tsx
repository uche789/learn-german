import SelectItem from "@/components/select-item/SelectItem";
import { IconType, SupportedLanguages } from "@/lib/types";
import { useContext, useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import AppHeader from "./app-header/AppHeader";
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

  const supportedLanguages: SupportedLanguages[] = ["de", "fr", "jp"];
  return (supportedLanguages as string[]).includes(params?.lang || "") ? (
    <>
      <AppHeader />
      <main className="max-w-screen-md w-full px-4 m-auto pt-24 pb-24">
        <Outlet />
      </main>
      <AppFooter />
    </>
  ) : (
    <Navigate to="/error" replace />
  );
}
