import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, disabled}) => {
    return (
        <SButton onClick={onClick} disabled={disabled}>
            {children}
        </SButton>
    )
}

export default Button;

const SButton = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.disabled ? '#ccc' : '#333'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#ccc' : '#555'};
    }

    &:active {
        background-color: ${props => props.disabled ? '#ccc' : '#111'};
  }
`