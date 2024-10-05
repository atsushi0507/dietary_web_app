import React from 'react';
import { render, screen } from '@testing-library/react';
import BasicAlert from '../components/atoms/Alert';


describe('BasicAlert component', () => {
  test('renders the correct message', () => {
    render(<BasicAlert severity="success" message="Operation successful!" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('Operation successful!');
  });

  test('displays the correct message with success severity', () => {
    render(<BasicAlert severity="success" message="Success!" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveTextContent('Success!');
  });

  test('displays the correct message with error severity', () => {
    render(<BasicAlert severity="error" message="Error occurred!" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveTextContent('Error occurred!');
  });

  test('displays the correct message with warning severity', () => {
    render(<BasicAlert severity="warning" message="Warning!" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveTextContent('Warning!');
  });

  test('displays the correct message with info severity', () => {
    render(<BasicAlert severity="info" message="Information" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveTextContent('Information');
  });

  test('handles empty message gracefully', () => {
    render(<BasicAlert severity="info" message="" />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
  });
});
