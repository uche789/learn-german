import { IconType } from "@/types"
import SvgIcon from "../base-components/svg-icon/svg-icon"
import './app-header.scss'
import Dropdown from "../base-components/dropdown/dropdown"

export default function AppHeader() {
  return <header
    className='fixed w-full min-h-16 flex items-center justify-between bg-white z-10 shadow px-2'
  >
    <button className="flex items-center">
      <SvgIcon name={IconType.ArrowLeft}/><span className="ps-1">Back</span>
    </button>
    <span
      aria-label="website name"
      className="text-xl text-pink-main font-bold"
    >
      STUDY MORE
    </span>
    <SvgIcon name={IconType.German} />
    {/* <Dropdown /> */}

  </header>
}