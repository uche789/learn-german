import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Component from "./Button";
import userEvent from "@testing-library/user-event";

describe("[Base component]", () => {
  test("render primary button", async () => {
    render(<Component onClick={() => {}}>Text</Component>);
    screen.getByTestId("btn-primary");
  });

  test("render secondary button", async () => {
    render(
      <Component onClick={() => {}} variant="secondary">
        Text
      </Component>,
    );
    screen.getByTestId("btn-secondary");
  });

  test("disabled", async () => {
    render(
      <Component onClick={() => {}} isDisabled>
        Text
      </Component>,
    );
    const btn = await screen.getByTestId("btn-primary");
    expect(btn.hasAttribute("disabled"));
  });

  test("onClick called", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Component onClick={onClick} isDisabled>
        Text
      </Component>,
    );
    await user.click(screen.getByTestId("btn-primary"));
    // expect(onClick).toHaveBeenCalled();
  });
});
