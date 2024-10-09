import React from "react";
import styled from "styled-components";


const TextInput = ({
    placeholder = "",  // イコールの前後にスペース
    name = "",
    type = "text",
    required = false,
    value = "",
    onChange = () => {},
    onBlur = () => {}
}) => {
    return (
        <SInput
            placeholder={placeholder}
            name={name}
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};

export default TextInput;

const SInput = styled.input`

`