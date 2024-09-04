// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import Component from "./AppHeader";

test("renders header component", async () => {
  render(<Component />);
  const linkElement = await waitFor(() => screen.getByText(/STUDY MORE/i));
  expect(linkElement).toBeInTheDocument();
});
