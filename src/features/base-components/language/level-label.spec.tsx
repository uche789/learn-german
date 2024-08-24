import { render, screen } from "@testing-library/react"
import Component from './level-label';
import { AppLanguage, LanguageLevel } from "./data";

describe("[base components] level label", () => {
    test("renders correct", async () => {
        render(<Component level={LanguageLevel.Advanced} language={AppLanguage.European} />);
        const element = await screen.findByTestId(`level-${LanguageLevel.Advanced}`);
        expect(element).toBeInTheDocument();
    })
})