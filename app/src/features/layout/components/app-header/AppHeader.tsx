import { IconType } from "@/lib/types";
import SvgIcon from "@/components/svg-icon/svg-icon";
import "./AppHeader.scss";
import Dropdown from "@/components/dropdown/dropdown";

export default function AppHeader() {
  return (
    <header className="fixed w-full flex items-center min-h-16 bg-white z-10 shadow">
      <div className="max-w-screen-lg w-full px-4 m-auto flex items-center justify-between">
        <button className="flex items-center">
          <SvgIcon name={IconType.ArrowLeft} />
          <span className="ps-1">Back</span>
        </button>
        <span
          aria-label="website name"
          className="text-xl text-pink-main font-bold"
        >
          STUDY MORE
        </span>
        <SvgIcon name={IconType.German} />
        {/* <Dropdown /> */}
      </div>
    </header>
  );
}
