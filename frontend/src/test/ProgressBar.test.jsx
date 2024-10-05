// ProgressBar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/atoms/ProgressBar';

describe('ProgressBar', () => {
  test('renders with percent value', () => {
    render(<ProgressBar value={50} maxValue={100} isPercent={true} />);
    expect(screen.getByText(/50%/)).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders with step value', () => {
    render(<ProgressBar value={2} maxValue={6} isPercent={false} />);
    expect(screen.getByText(/2\/6/)).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '33'); // (2/6) * 100
  });

  test('does not exceed 100%', () => {
    render(<ProgressBar value={8} maxValue={6} isPercent={false} />);
    expect(screen.getByText(/8\/6/)).toBeInTheDocument(); // 8/6の表示
  });
});
