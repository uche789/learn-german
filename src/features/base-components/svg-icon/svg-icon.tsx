// https://medium.com/@mateuszpalka/creating-your-custom-svg-icon-library-in-react-a5ff1c4c704a

import { Suspense, lazy as _lazy, useMemo } from "react";
import icons from "./icons";


const svgIcon = ({ name }: { name: string }) => {
  const Icon = useMemo(() => icons[name], [name]);

  if (!Icon) return null;

  return <div
    aria-label={name}
    role="image"
    className="inline-flex items-center justify-items-center"
    data-testid={'svg-icon-' + name}
  >
    <Suspense fallback={null}>
      <Icon />
    </Suspense>
  </div>
}

export default svgIcon;