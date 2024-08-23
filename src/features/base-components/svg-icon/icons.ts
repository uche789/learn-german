import { LazyExoticComponent, lazy } from "react";

const icons: Record<string, LazyExoticComponent<any>> = {
  french: lazy(async () => await import("@/assets/icons/french.svg?react")),
  german: lazy(async () => await import("@/assets/icons/german.svg?react")),
  japanese: lazy(async () => await import("@/assets/icons/japanese.svg?react")),
  learn: lazy(async () => await import("@/assets/icons/learn.svg?react")),
  practice: lazy(async () => await import("@/assets/icons/practice.svg?react")),
};

export default icons;