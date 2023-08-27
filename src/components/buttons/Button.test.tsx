import { render, screen } from '@testing-library/react';
import {Button} from './Button';

test('renders a button', () => {
  render(<Button label="Click me"  className = 'custom-button'/>);
  const buttonElement = screen.getByText(/cli me/i);
  expect(buttonElement).toBeInTheDocument();
});
