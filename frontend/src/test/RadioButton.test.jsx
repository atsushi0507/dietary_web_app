import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from '../components/atoms/RadioButton';

describe('RadioButton component', () => {
  test('renders the radio button with the correct value', () => {
    render(<RadioButton name="gender" value="Male" checked={false} onChange={() => {}} />);
    const radioButtonElement = screen.getByRole('radio');
    expect(radioButtonElement).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument(); // Check if the label is rendered
  });

  test('radio button is checked when passed the checked prop as true', () => {
    render(<RadioButton name="gender" value="Female" checked={true} onChange={() => {}} />);
    const radioButtonElement = screen.getByRole('radio');
    expect(radioButtonElement).toBeChecked(); // Check if the radio button is checked
  });

  test('radio button is unchecked when passed the checked prop as false', () => {
    render(<RadioButton name="gender" value="Female" checked={false} onChange={() => {}} />);
    const radioButtonElement = screen.getByRole('radio');
    expect(radioButtonElement).not.toBeChecked(); // Check if the radio button is unchecked
  });

  test('calls the onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<RadioButton name="gender" value="Male" checked={false} onChange={handleChange} />);
    const radioButtonElement = screen.getByRole('radio');

    // Simulate a click event
    fireEvent.click(radioButtonElement);
    
    // Check if onChange has been called once
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
