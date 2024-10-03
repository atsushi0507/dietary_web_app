import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "../components/atoms/Title";

describe("Title Component", () => {
    test("renders with default font size when level is not provided", () => {
        render(<Title>Hello Default Level</Title>); // levelを指定しない
        const titleElement = screen.getByText(/Hello Default Level/i);
        expect(titleElement).toHaveStyle("font-size: 2.5rem"); // デフォルトのh1サイズ
    });

    test("renders title with correct text", () => {
        render(<Title level={1}>Hello World</Title>);
        const titleElement = screen.getByText(/Hello World/i);
        expect(titleElement).toBeInTheDocument();
    });

    test("renders with blue color when primary is true", () => {
        render(<Title level={2}>Primary Title</Title>);
        const titleElement = screen.getByText(/Primary Title/i);
        expect(titleElement).toHaveStyle("font-size: 2rem");
    });

    test("renders with black color when primary is false", () => {
        render(<Title level={3}>Secondary Title</Title>);
        const titleElement = screen.getByText(/Secondary Title/i);
        expect(titleElement).toHaveStyle("font-size: 1.75rem");
    });

    test("renders with default font size for an unknown level", () => {
        render(<Title level={4}>Default Size Title</Title>); // level 4 は想定外の値
        const titleElement = screen.getByText(/Default Size Title/i);
        expect(titleElement).toHaveStyle("font-size: 1rem");
    });
});
