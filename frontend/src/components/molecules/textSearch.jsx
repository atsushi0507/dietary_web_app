import React from "react";
import styled from "styled-components";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";

const TextSearch = ({ strMenu, setStrMenu, handleSearch}) => {
    return (
        <Container>
            <TextInput
                placeholder="チキンカレー"
                name="menu"
                value={strMenu}
                onChange={setStrMenu}
            />
            <Button
                onClick={handleSearch}
            >
                検索
            </Button>
        </Container>
    );
};

export default TextSearch;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`