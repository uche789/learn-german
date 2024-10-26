import { render, screen } from "@testing-library/react";
import Component from "./level-label";
import { LanguageProficienyLevel, LevelLanguage } from "@/lib/types";

describe("[base components] level label", () => {
  test("renders correct", async () => {
    render(
      <Component
        level={LanguageProficienyLevel.Advanced}
        language={LevelLanguage.European}
      />,
    );
    const element = await screen.findByTestId(
      `level-${LanguageProficienyLevel.Advanced}`,
    );
    expect(element).toBeInTheDocument();
  });
});
