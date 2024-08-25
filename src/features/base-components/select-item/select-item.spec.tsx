import { render, screen } from "@testing-library/react";
import Component from "./select-item"
import { IconType } from "@/types";

describe("[base components]", () => {
  test("should render correctly", async () => {
    render(<Component label="Learn language" isSelected={false} onClick={() => {}} />);
    const element = await screen.findByTestId('select-item');
    expect(element.innerHTML.includes('Learn language')).toBeTruthy();
    expect(element.classList.contains('bg-pink-light')).toBeFalsy();
  })

  test("should render isSelected correctly", async () => {
    render(<Component label="Learn language" isSelected={true} onClick={() => {}} />);
    const element = await screen.findByTestId('select-item');
    expect(element.classList.contains('bg-pink-light')).toBeTruthy();
  })

  test("should render with icon", async () => {
    render(<Component label="Learn language" isSelected={true} icon={IconType.German} onClick={() => {}} />);
    const element = await screen.findByTestId('select-item');
    const labelElement = await screen.findByTestId('select-item-label');
    expect(labelElement.classList.contains('ps-2')).toBeTruthy();
    expect(element.innerHTML.includes('svg-icon-German')).toBeTruthy();
  })

  test("should render bolded text", async () => {
    render(<Component label="Learn language" isBolded onClick={() => {}} />);
    const labelElement = await screen.findByTestId('select-item-label');
    expect(labelElement.classList.contains('font-semibold')).toBeTruthy();
  })
})