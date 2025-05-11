// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock('@/lib/config', () => ({
  spaceId: 'test',
  accessToken: 'test'
}));

test("renders APP", async () => {
  render(<App />);
  const linkElement = await waitFor(() => screen.getByText(/TomoStudy/i));
  expect(linkElement).toBeInTheDocument();
});
