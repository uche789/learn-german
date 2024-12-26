import { SupportedLanguages } from "@/lib/types";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AppHeader from "./app-header/AppHeader";
import { GlobalContext } from "@/context/global";
import AppFooter from "./app-footer/AppFooter";

export default function Layout() {
  const state = useContext(GlobalContext);

  const supportedLanguages: SupportedLanguages[] = ["de", "fr", "jp"];
  return (supportedLanguages as string[]).includes(state.langCode || "") ? (
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
