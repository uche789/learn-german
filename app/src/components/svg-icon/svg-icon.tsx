// https://medium.com/@mateuszpalka/creating-your-custom-svg-icon-library-in-react-a5ff1c4c704a

import { Suspense, lazy as _lazy, useMemo } from "react";
import icons from "./icons";
import { IconType } from "@/lib/types";
import "./svg-icon.scss";

const svgIcon = ({ name, currentColor = false }: { name: IconType, currentColor?: boolean }) => {
  const Icon = useMemo(() => icons[name], [name]);

  if (!Icon) return null;

  let className = "svg-icon inline-flex items-center justify-items-center h-8";

  if (currentColor) {
    className += " is-current-color"
  }

  return (
    <div
      aria-label={name}
      role="image"
      className={className}
      data-testid={"svg-icon-" + name}
    >
      <Suspense fallback={null}>
        <Icon />
      </Suspense>
    </div>
  );
};

export default svgIcon;
