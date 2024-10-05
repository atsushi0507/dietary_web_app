import React from "react";
import styled from "styled-components";

const RadioButton = ({name, value, checked, onChange}) => {
    return (
        <SLabel>
            <SRadio
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {value}
        </SLabel>
    );
};

export default RadioButton;

const SLabel = styled.label`

`

const SRadio = styled.input`

`