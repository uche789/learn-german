import { IconType } from "@/lib/types";
import SvgIcon from "@/components/svg-icon/svg-icon";
import "./AppHeader.scss";
import links from "../links";
import { Link, useNavigate, useParams } from "react-router-dom";
import LanguageDropdown from "@/components/language-dropdown.tsx/LanguageDropdown";

export default function AppHeader() {
  const params = useParams();
  const navigate = useNavigate();

  const getnavClasses = (to: string) => {
    let className = "px-2 hover:underline hover:text-pink-600"
    if (window.location.pathname.startsWith(`/${params.lang}${to}`)) {
      className += " font-semibold"
    }
    return className;
  }

  const setLanguage = (value: string) => {
    const pathname = window.location.pathname.replace(/\/(de|fr|jp)/, `/${value}`);
    window.location.replace(window.origin + pathname)
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
              to={'/' + params.lang + link.to} key={link.to}
              className={getnavClasses(link.to)}
            >{link.name}</Link>
            )}
          </nav>
          <LanguageDropdown clickHandler={setLanguage} selected={params.lang} />
        </div>
      </div>
    </header>
  );
}
