import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from '../components/atoms/Checkbox';

describe('CheckBox component', () => {
  test('renders the checkbox with the correct label', () => {
    render(<CheckBox label="Accept Terms" name="terms" checked={false} onChange={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  test('checkbox is checked when passed the checked prop as true', () => {
    render(<CheckBox label="Subscribe" name="subscribe" checked={true} onChange={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked(); // Check if the checkbox is checked
  });

  test('checkbox is unchecked when passed the checked prop as false', () => {
    render(<CheckBox label="Subscribe" name="subscribe" checked={false} onChange={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).not.toBeChecked(); // Check if the checkbox is unchecked
  });

  test('calls the onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<CheckBox label="Subscribe" name="subscribe" checked={false} onChange={handleChange} />);
    const checkboxElement = screen.getByRole('checkbox');
    
    // Simulate a click event
    fireEvent.click(checkboxElement);
    
    // Check if onChange has been called once
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
