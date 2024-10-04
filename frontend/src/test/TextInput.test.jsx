import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../components/atoms/TextInput';
// import '@testing-library/jest-dom/extend-expect';

describe('TextInput component', () => {

    test('renders with the correct placeholder', () => {
        render(<TextInput placeholder="Enter your name" />);
        const inputElement = screen.getByPlaceholderText('Enter your name');
        expect(inputElement).toBeInTheDocument();
    });

    test('sets the correct name attribute', () => {
        render(<TextInput name="username" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('name', 'username');
    });

    test('sets the correct type attribute', () => {
        render(<TextInput type="password" placeholder="Password" />);
        const inputElement = screen.getByPlaceholderText('Password');
        expect(inputElement).toHaveAttribute('type', 'password');
    });


    test('marks the input as required', () => {
        render(<TextInput required={true} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeRequired();
    });

    test('displays the correct value', () => {
        render(<TextInput value="Test Value" onChange={() => {}} />);
        const inputElement = screen.getByDisplayValue('Test Value');
        expect(inputElement).toBeInTheDocument();
    });



    test('sets the correct pattern attribute', () => {
        render(<TextInput pattern="[A-Za-z]{3,}" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('pattern', '[A-Za-z]{3,}');
    });

    test('renders with default props', () => {
        render(<TextInput />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('type', 'text'); // デフォルトの type
        expect(inputElement).toHaveAttribute('placeholder', ''); // デフォルトの placeholder
    });


    test('renders with an empty value', () => {
        render(<TextInput value="" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveValue(''); // 空の値が正しく表示されているか確認
    });

    test('matches the snapshot', () => {
        const { asFragment } = render(<TextInput />);
        expect(asFragment()).toMatchSnapshot(); // スナップショットテスト
    });
});


