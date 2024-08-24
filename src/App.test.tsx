// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = await waitFor(() => screen.getByText(/STUDY MORE/i));
  expect(linkElement).toBeInTheDocument();
});
