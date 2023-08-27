import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CounterInput } from './CounterInput'; // Update the import path as needed

test('renders the CounterInput component', () => {
  render(<CounterInput count={0} setCount={() => {}} />);
  
  const minusButton = screen.getByText('-');
  const plusButton = screen.getByText('+');
  const countDisplay = screen.getByTestId('count-display');

  expect(minusButton).toBeInTheDocument();
  expect(plusButton).toBeInTheDocument();
  expect(countDisplay).toHaveTextContent('0');
});

test('increments count when the plus button is clicked', () => {
  let countValue = 0;
  const setCountMock = (newCount: number) => {
    countValue = newCount;
  };

  render(<CounterInput count={countValue} setCount={setCountMock} />);
  const plusButton = screen.getByText('+');

  fireEvent.click(plusButton);

  expect(countValue).toBe(1);
});

test('decrements count when the minus button is clicked', () => {
  let countValue = 1;
  const setCountMock = (newCount: number) => {
    countValue = newCount;
  };

  render(<CounterInput count={countValue} setCount={setCountMock} />);
  const minusButton = screen.getByText('-');

  fireEvent.click(minusButton);

  expect(countValue).toBe(0);
});

test('does not allow count to go below 0', () => {
  let countValue = 0;
  const setCountMock = (newCount: number) => {
    countValue = newCount;
  };

  render(<CounterInput count={countValue} setCount={setCountMock} />);
  const minusButton = screen.getByText('-');

  fireEvent.click(minusButton);

  expect(countValue).toBe(0);
});
