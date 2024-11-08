import { IconType } from "@/lib/types";
import { LazyExoticComponent, lazy } from "react";

const icons: Record<IconType, LazyExoticComponent<any>> = {
  [IconType.French]: lazy(
    async () => await import("@/assets/icons/french.svg?react")
  ),
  [IconType.German]: lazy(
    async () => await import("@/assets/icons/german.svg?react")
  ),
  [IconType.Japanese]: lazy(
    async () => await import("@/assets/icons/japanese.svg?react")
  ),
  [IconType.Grammar]: lazy(
    async () => await import("@/assets/icons/grammar.svg?react")
  ),
  [IconType.Practice]: lazy(
    async () => await import("@/assets/icons/practice.svg?react")
  ),
  [IconType.ArrowLeft]: lazy(
    async () => await import("@/assets/icons/arrowLeft.svg?react")
  ),
  [IconType.Vocabulary]: lazy(
    async () => await import("@/assets/icons/vocab.svg?react")
  ),
  [IconType.Idioms]: lazy(
    async () => await import("@/assets/icons/idioms.svg?react")
  )
};

export default icons;
