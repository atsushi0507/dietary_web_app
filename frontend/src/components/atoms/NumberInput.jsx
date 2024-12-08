import React from "react";
import styled from "styled-components";

const NumberInput = ({
    placeholder = "",
    min = 0,
    max = 100,
    name = "",
    required = false,
    value = "",
    onChange = () => {},
    pattern = "",
    step = 1,
    disabled = false,
    ariaLabel = ""
}) => {
    return (
        <SInput
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            pattern={pattern}
            step={step}
            disabled={disabled}
            aria-label={ariaLabel}
        />
    );
}

export default NumberInput;

const SInput = styled.input`
  width: 50%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: 2px solid #007bff;
  }
`