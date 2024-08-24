import { render, screen } from "@testing-library/react";
import Component from "./select-item"

describe("[base components]", () => {
  test("should render correctly", async () => {
    render(<Component label="Learn language" isSelected={false} />);
    const element = await screen.findByText('Learn language');
    expect(element.classList.contains('bg-pink-light')).toBeFalsy();
  })

  test("should render isSelected correctly", async () => {
    render(<Component label="Learn language" isSelected={true} />);
    const element = await screen.findByText('Learn language');
    expect(element.classList.contains('bg-pink-light')).toBeTruthy();
  })

  test("should render with icon", async () => {
    render(<Component label="Learn language" isSelected={true} icon="german" />);
    const element = await screen.findByText('Learn language');
    expect(element.innerHTML.includes('svg-icon-german')).toBeTruthy();
  })
})