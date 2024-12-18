import React from "react";
import styled from "styled-components";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";

const TextSearch = ({ strMenu, setStrMenu }) => {
    return (
        <Container>
            <TextInput
                placeholder="チキンカレー"
                name="menu"
                value={strMenu}
                onChange={setStrMenu}
            />
        </Container>
    );
};

export default TextSearch;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`