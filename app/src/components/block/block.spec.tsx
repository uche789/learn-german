import { render, screen } from "@testing-library/react";
import Component from "./block";

describe("[Shared Component] block", () => {
  test("render text", () => {
    render(<Component text="würde" />);
    const element = screen.getByTestId("block-fill-in");
    expect(element.innerHTML).toBe("würde");
  });
});
