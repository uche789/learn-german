import { render, screen } from "@testing-library/react";
import SvgIcon from "./svg-icon";
import { IconType } from "@/lib/types";

test("renders french svg icon", async () => {
  render(<SvgIcon name={IconType.French} />);
  const svgElement = await screen.findByTestId("svg-icon-French");
  expect(svgElement).toBeInTheDocument();
});
