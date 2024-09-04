// https://medium.com/@mateuszpalka/creating-your-custom-svg-icon-library-in-react-a5ff1c4c704a

import { Suspense, lazy as _lazy, useMemo } from "react";
import icons from "./icons";
import { IconType } from "@/types";
import "./svg-icon.scss";

const svgIcon = ({ name }: { name: IconType }) => {
  const Icon = useMemo(() => icons[name], [name]);

  if (!Icon) return null;

  return (
    <div
      aria-label={name}
      role="image"
      className="svg-icon inline-flex items-center justify-items-center h-8"
      data-testid={"svg-icon-" + name}
    >
      <Suspense fallback={null}>
        <Icon />
      </Suspense>
    </div>
  );
};

export default svgIcon;
