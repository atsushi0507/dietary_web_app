import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from '../components/atoms/Link';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Link component', () => {
  test('renders an internal link when external is false', () => {
    render(
      <Router>
        <Link to="/internal-page" external={false}>
          Internal Link
        </Link>
      </Router>
    );
    const linkElement = screen.getByText('Internal Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/internal-page');
  });

  test('renders an external link when external is true', () => {
    render(
      <Link to="https://example.com" external={true}>
        External Link
      </Link>
    );
    const linkElement = screen.getByText('External Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the correct child text for internal link', () => {
    render(
      <Router>
        <Link to="/about" external={false}>
          About Us
        </Link>
      </Router>
    );
    const linkElement = screen.getByText('About Us');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the correct child text for external link', () => {
    render(
      <Link to="https://example.com" external={true}>
        Visit Example
      </Link>
    );
    const linkElement = screen.getByText('Visit Example');
    expect(linkElement).toBeInTheDocument();
  });

  test('does not break without external or internal flag', () => {
    // This is just a fallback test to ensure the component does not crash
    render(
      <Router>
        <Link to="/no-flag">
          No Flag Link
        </Link>
      </Router>
    );
    const linkElement = screen.getByText('No Flag Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/no-flag');
  });
});
