// https://medium.com/@mateuszpalka/creating-your-custom-svg-icon-library-in-react-a5ff1c4c704a

import { Suspense, lazy as _lazy, useMemo } from "react";
import icons from "./icons";


const svgIcon = ({ name }: { name: string }) => {
  const Icon = useMemo(() => icons[name], [name]);

  if (!Icon) return null;

  return <>
    <Suspense fallback={null}>
      <Icon />
    </Suspense>
  </>
}

export default svgIcon;