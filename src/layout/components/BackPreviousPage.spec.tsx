// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import Component from "./BackPreviousPage";
import { BrowserRouter } from "react-router-dom";

describe("BackPreviousPage", () => {
  it("displays Go back button", async () => {
    render(
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    );
    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  it("displays Go back to Vocabulary button", async () => {
    render(
      <BrowserRouter>
        <Component text="Vocabulary" />
      </BrowserRouter>
    );
    expect(screen.getByText("Go back to Vocabulary")).toBeInTheDocument();
  });
})