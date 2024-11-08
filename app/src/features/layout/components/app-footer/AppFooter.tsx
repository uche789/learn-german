import { Link, useParams } from "react-router-dom";
import links from "../links";
import { IconType } from "@/lib/types";
import SvgIcon from "@/components/svg-icon/svg-icon";

export default function AppFooter() {
  const params = useParams();

  const getnavClasses = (to: string) => {
    let className = "px-2 flex flex-col justify-center items-center"
    if (window.location.pathname.startsWith(`/${params.lang}${to}`)) {
      className += " font-semibold text-pink-600"
    }
    return className;
  }

  return <footer className="fixed bottom-0 sm:absolute w-full flex justify-center">
    <nav className="sm:hidden flex m-auto justify-between w-full p-4 shadow-inner bg-white">
      {links.map((link) => <Link
        to={'/' + params.lang + link.to} key={link.to}
        className={getnavClasses(link.to)}
      >
        <SvgIcon name={link.icon} aria-hidden="true" currentColor={true} />
        {link.name}
      </Link>
      )}
    </nav>
  </footer>
}