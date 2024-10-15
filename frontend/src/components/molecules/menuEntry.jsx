import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";

const MenuEntry = ({ menuResult, handleAddMeal }) => {
    const {menu, cal} = menuResult;

    return (
        <Container>
            <Typography variant="p">
                {menu}
            </Typography>
            <Typography variant="p">
                {cal} kcal
            </Typography>
            <Button
                onClick={() => handleAddMeal(menuResult)}
            >
                追加
            </Button>
        </Container>
    );
};

export default MenuEntry;

const Container = styled.div`
    display: flex;
`