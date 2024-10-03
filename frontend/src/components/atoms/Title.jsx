import React from 'react';
import styled from 'styled-components';

const Title = ({ level = 1, children }) => {
    return (
        <STitle as={`h${level}`} level={level}>
            {children}
        </STitle>
    );
};

export default Title;

const STitle = styled.h1`
    font-size: ${(props) => {
        switch (props.level) {
            case 1:
                return '2.5rem'; // h1のサイズ
            case 2:
                return '2rem'; // h2のサイズ
            case 3:
                return '1.75rem'; // h3のサイズ
            default:
                return '1rem'; // デフォルトサイズ
        }
    }};
    color: black;
    margin: 1rem 0;
`;
