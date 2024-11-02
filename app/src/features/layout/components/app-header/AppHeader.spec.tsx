// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import Component from "./AppHeader";
import { BrowserRouter } from "react-router-dom";

test("renders header component", async () => {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
  const linkElement = await waitFor(() => screen.getByText(/STUDY MORE/i));
  expect(linkElement).toBeInTheDocument();
});
