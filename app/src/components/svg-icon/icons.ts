import { IconType } from "@/lib/types";
import { LazyExoticComponent, lazy } from "react";

const icons: Record<IconType, LazyExoticComponent<any>> = {
  [IconType.French]: lazy(
    async () => await import("@/assets/icons/french.svg?react"),
  ),
  [IconType.German]: lazy(
    async () => await import("@/assets/icons/german.svg?react"),
  ),
  [IconType.Japanese]: lazy(
    async () => await import("@/assets/icons/japanese.svg?react"),
  ),
  [IconType.Learn]: lazy(
    async () => await import("@/assets/icons/learn.svg?react"),
  ),
  [IconType.Practice]: lazy(
    async () => await import("@/assets/icons/practice.svg?react"),
  ),
  [IconType.ArrowLeft]: lazy(
    async () => await import("@/assets/icons/arrowLeft.svg?react"),
  ),
};

export default icons;
