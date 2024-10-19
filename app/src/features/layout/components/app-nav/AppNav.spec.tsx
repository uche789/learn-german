// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import Component from "./AppNav";
import { BrowserRouter } from "react-router-dom";



describe("AppNav Component", () => {
  test("renders navigation component", async () => {
    render(
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    );
    const linkElement = await waitFor(() => screen.getByTestId("nav"));
    expect(linkElement).toBeInTheDocument();
  });
});
