import { IconType, SupportedLanguages } from "@/lib/types";
import SvgIcon from "@/components/svg-icon/svg-icon";
import "./AppHeader.scss";
import links from "../links";
import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "@/components/language-dropdown.tsx/LanguageDropdown";
import { useContext } from "react";
import { GlobalActionType, GlobalContext, GlobalDispatch } from "@/context/global";

export default function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useContext(GlobalDispatch);
  const state = useContext(GlobalContext);

  const getnavClasses = (to: string) => {
    let className = "px-2 hover:underline hover:text-pink-600"
    if (window.location.pathname.startsWith(`/${state.langCode}${to}`)) {
      className += " font-semibold"
    }
    return className;
  }

  const setLanguage = (value: string) => {
    dispatch({ type: GlobalActionType.SetLang, payload: { value: value as SupportedLanguages }})
    if (/\/grammar\/[^/]+/.test(window.location.pathname)) {
      navigate('/' + value + '/grammar');
      return;
    } else if (/\/practice\/[^/]+/.test(window.location.pathname)) {
      navigate('/' + value + '/practice');
      return;
    } else if (/\/vocabulary\/[^/]+/.test(window.location.pathname)) {
      navigate('/' + value + '/vocabulary');
      return;
    } else if (/\/idiom\//.test(window.location.pathname)) {
      navigate('/' + value + '/idioms');
      return;
    }

    const pathname = window.location.pathname.replace(/\/(de|fr|jp)/, `/${value}`);
    navigate(pathname.replace('/learn-german', ''))
  }

  return (
    <header className="fixed w-full flex items-center min-h-16 bg-white z-10 shadow">
      <div className="max-w-screen-lg w-full px-4 m-auto flex items-center justify-between">
        <button className="flex sm:hidden items-center" onClick={() => navigate(-1)}>
          <SvgIcon name={IconType.ArrowLeft} />
          <span className="ps-1">Back</span>
        </button>
        <span
          aria-label="website name"
          className="text-xl text-pink-main font-bold"
        >
          STUDY MORE
        </span>
        <div className="flex items-center">
          <nav className="sm:block hidden">
            {links.map((link) => <Link
              to={'/' + state.langCode + link.to} key={link.to}
              className={getnavClasses(link.to)}
            >{link.name}</Link>
            )}
          </nav>
          <LanguageDropdown clickHandler={setLanguage} selected={state.langCode} />
        </div>
      </div>
    </header>
  );
}
