import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/atoms/Button';

describe('Button Component', () => {
    test('renders button with correct text', () => {
        render(<Button>Click Me</Button>); // childrenを使用
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeInTheDocument(); // ボタンがレンダリングされていることを確認
    });

    test('calls onClick function when clicked', () => {
        const handleClick = jest.fn(); // モック関数を作成
        render(<Button onClick={handleClick}>Click Me</Button>); // childrenを使用
        const buttonElement = screen.getByText(/Click Me/i);
        fireEvent.click(buttonElement); // ボタンをクリック
        expect(handleClick).toHaveBeenCalledTimes(1); // モック関数が1回呼ばれたことを確認
    });

    test('is disabled when disabled prop is true', () => {
        render(<Button disabled={true}>Click Me</Button>); // childrenを使用
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeDisabled(); // ボタンが無効であることを確認
    });

    test('does not call onClick when disabled', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} disabled={true}>Click Me</Button>); // childrenを使用
        const buttonElement = screen.getByText(/Click Me/i);
        fireEvent.click(buttonElement); // ボタンをクリック
        expect(handleClick).not.toHaveBeenCalled(); // 無効な状態では呼ばれないことを確認
    });
});
