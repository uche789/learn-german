import SvgIcon from "@/components/svg-icon/svg-icon";
import { IconType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export default function BackPreviousPage({ text, link }: { text?: string, link?: string }) {
  const navigate = useNavigate();
  return <div className="mb-8 hidden sm:block">
    <button className="flex items-center" onClick={() => link ? navigate(link) : navigate(-1)}>
      <SvgIcon aria-hidden="true" name={IconType.ArrowLeft} />
      <span className="ps-1">Go back{!!text && ` to ${text}`}</span>
    </button>
  </div>
}