import React from "react";
import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect';
import Text from "../components/atoms/Text";

describe('Text component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(<Text>Test Text</Text>);
        const element = getByText('Test Text');
        expect(element).toBeInTheDocument();
    });

    test('applies the correct font weight', () => {
        const { getByText } = render(<Text fontWeight="bold">Bold font</Text>);
        const element = getByText('Bold font');
        expect(element).toHaveStyle('font-weight: bold');
    });

    test('applies the correct text align', () => {
        const { getByText } = render(<Text textAlign="center">Center Text</Text>);
        const element = getByText('Center Text');
        expect(element).toHaveStyle('text-align: center');
    });

    test('renders with the correct HTML tag', () => {
        const { container } = render(<Text as="h1">Heading Text</Text>);
        const headingElement = container.querySelector('h1'); // as="h1" が適用されているか
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent('Heading Text');
    });
});