import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from '../components/atoms/NumberInput';
// import '@testing-library/jest-dom/extend-expect';

describe('NumberInput component', () => {
    test('renders with the correct placeholder', () => {
        render(<NumberInput placeholder="Enter a number" />);
        const inputElement = screen.getByPlaceholderText('Enter a number');
        expect(inputElement).toBeInTheDocument();
    });

    test('sets the correct name attribute', () => {
        render(<NumberInput name="quantity" />);
        const inputElement = screen.getByRole('spinbutton'); // "spinbutton" role is for number inputs
        expect(inputElement).toHaveAttribute('name', 'quantity');
    });

    test('allows changing value', () => {
        const handleChange = jest.fn();
        render(<NumberInput value={0} onChange={handleChange} />);
        const inputElement = screen.getByRole('spinbutton');
        
        // 値を '10' に変更
        fireEvent.change(inputElement, { target: { value: '10' } });
        
        // onChange が呼ばれたかを確認
        expect(handleChange).toHaveBeenCalledTimes(1); // Ensure onChange is called
    });

    // test('sets the correct required attribute', () => {
    //     render(<NumberInput required={true} />);
    //     const inputElement = screen.getByRole('spinbutton');
    //     expect(inputElement).toBeRequired();
    // });

    // test('sets the correct min and max attributes', () => {
    //     render(<NumberInput min={1} max={10} />);
    //     const inputElement = screen.getByRole('spinbutton');
    //     expect(inputElement).toHaveAttribute('min', '1');
    //     expect(inputElement).toHaveAttribute('max', '10');
    // });

    // test('disables the input when disabled prop is true', () => {
    //     render(<NumberInput disabled={true} />);
    //     const inputElement = screen.getByRole('spinbutton');
    //     expect(inputElement).toBeDisabled();
    // });

    // test('renders with correct step attribute', () => {
    //     render(<NumberInput step={0.5} />);
    //     const inputElement = screen.getByRole('spinbutton');
    //     expect(inputElement).toHaveAttribute('step', '0.5');
    // });

    // test('renders with aria-label', () => {
    //     render(<NumberInput ariaLabel="Number input" />);
    //     const inputElement = screen.getByLabelText('Number input');
    //     expect(inputElement).toBeInTheDocument();
    // });

    // test('renders with title', () => {
    //     render(<NumberInput title="Input a number" />);
    //     const inputElement = screen.getByRole('spinbutton');
    //     expect(inputElement).toHaveAttribute('title', 'Input a number');
    // });
});


