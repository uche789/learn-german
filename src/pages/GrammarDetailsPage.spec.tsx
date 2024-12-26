import { render, screen } from "@testing-library/react";
import GrammarDetailsPage from "./GrammarDetailsPage";
import { useGrammarQuery } from "@/lib/api";
import { useParams } from "react-router-dom";
import { ReactNode } from "react";

jest.mock("@/components/Heading", () => ({ children }: { children: ReactNode}) => <h1>{children}</h1>);
jest.mock("@/lib/api", () => ({
  useGrammarQuery: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("GrammarDetailsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useParams as jest.Mock).mockReturnValue({ slug: "example-slug", lang: "de" });
    (useGrammarQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(<GrammarDetailsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useParams as jest.Mock).mockReturnValue({ slug: "example-slug", lang: "de" });
    (useGrammarQuery as jest.Mock).mockReturnValue({ isLoading: false, error: true });

    render(<GrammarDetailsPage />);

    expect(screen.getByText("Error loading grammar")).toBeInTheDocument();
  });

  it("renders data when query is successful", () => {
    (useParams as jest.Mock).mockReturnValue({ slug: "example-slug", lang: "de" });
    (useGrammarQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { title: "Grammar Title" },
    });

    render(<GrammarDetailsPage />);

    expect(screen.getByRole("heading", { name: /Grammar Title/i })).toBeInTheDocument();
  });
});
