import { render, screen } from '@testing-library/react'
import SvgIcon from './svg-icon';

test('renders learn react link', async () => {
  render(<SvgIcon name="french" />);
  const svgElement = await screen.findByTestId('svg-icon-french');
  expect(svgElement).toBeInTheDocument();
});
