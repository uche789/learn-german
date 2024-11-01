import SvgIcon from "@/components/svg-icon/svg-icon";
import { IconType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export default function BackPreviousPage({ text }: { text?: string }) {
  const navigate = useNavigate();
  return <div className="mb-4">
    <button className="hidden sm:flex items-center" onClick={() => navigate(-1)}>
      <SvgIcon aria-hidden="true" name={IconType.ArrowLeft} />
      <span className="ps-1">Go back{!!text && ` ${text}`}</span>
    </button>
  </div>
}