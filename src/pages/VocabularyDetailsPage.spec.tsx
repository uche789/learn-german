import { render, screen } from "@testing-library/react";
import VocabularyDetailsPage from "./VocabularyDetailsPage";
import { useSingleVocabularyQuery } from "@/lib/api";
import { BrowserRouter, useParams } from "react-router-dom";

// Mock the `useSingleVocabularyQuery` and `useParams` hooks
jest.mock("@/lib/api");
jest.mock('@/lib/config', () => ({
  spaceId: 'test',
  accessToken: 'test'
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("VocabularyDetailsPage", () => {
  const mockData = {
    word: "Haus",
    gender: "n",
    word_type: "Noun",
    english_translation: "House",
    definition: ["A building for human habitation."],
    examples: ["Das Haus ist groß.", "Das ist mein Haus."],
  };

  beforeEach(() => {
    // Default mock for `useParams` to return some sample slug and language
    (useParams as jest.Mock).mockReturnValue({ slug: "word_Haus", lang: "de" });
  });

  it("displays loading state", () => {
    (useSingleVocabularyQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <VocabularyDetailsPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays error message on API error", () => {
    (useSingleVocabularyQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <VocabularyDetailsPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/error loading vocabulary/i)).toBeInTheDocument();
  });

  it("displays vocabulary data correctly", async () => {
    (useSingleVocabularyQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <VocabularyDetailsPage />
      </BrowserRouter>
    );

    expect(await screen.findByText("Go back to Vocabulary")).toBeInTheDocument();
    expect(await screen.findByText("Haus")).toBeInTheDocument();
    expect(await screen.findByText("n")).toBeInTheDocument();
    expect(await screen.findByText("Noun")).toBeInTheDocument();
    expect(await screen.findByText("House")).toBeInTheDocument();

    expect(await screen.findByText("Definition(s)")).toBeInTheDocument();
    expect(await screen.findByText("A building for human habitation.")).toBeInTheDocument();

    expect(await screen.findByText("Example(s)")).toBeInTheDocument();
    expect(await screen.findByText("Das Haus ist groß.")).toBeInTheDocument();
    expect(await screen.findByText("Das ist mein Haus.")).toBeInTheDocument();
  });

  it("does not display definitions or examples if arrays are empty", async () => {
    (useSingleVocabularyQuery as jest.Mock).mockReturnValue({
      data: {
        ...mockData,
        definition: [],
        examples: [],
      },
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <VocabularyDetailsPage />
      </BrowserRouter>
    );

    // Vocabulary and translation should still render
    expect(await screen.findByText("Haus")).toBeInTheDocument();
    expect(await screen.findByText("House")).toBeInTheDocument();

    // Check that definitions and examples sections are not rendered
    expect(screen.queryByText("Definition(s)")).not.toBeInTheDocument();
    expect(screen.queryByText("Example(s)")).not.toBeInTheDocument();
  });
});
