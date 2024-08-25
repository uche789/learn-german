// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import Component from './app-nav';

test('renders navigation component', async () => {
  render(<Component />);
  const linkElement = await waitFor(() => screen.getByTestId('nav'));
  expect(linkElement).toBeInTheDocument();
});
