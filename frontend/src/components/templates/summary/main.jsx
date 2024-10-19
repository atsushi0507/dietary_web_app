"use client";
import React from "react";
import styled from "styled-components";
import Feedback from "./feedback";
import Dashboard from "./dashboard";

const Main = () => {
    return (
        <Container>
            <Feedback/>
            <Dashboard/>
        </Container>
    );
};

export default Main;

const Container = styled.div`
    width: 100%;
`