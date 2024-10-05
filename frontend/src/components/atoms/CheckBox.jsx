import React from "react";
import styled from "styled-components";

const CheckBox = ({ label, name, checked, onChange }) => {
    return (
        <SLabel>
        <SCheck
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        /> {label}
      </SLabel>
    );
}

export default CheckBox;

const SLabel = styled.label`

`

const SCheck = styled.input`

`