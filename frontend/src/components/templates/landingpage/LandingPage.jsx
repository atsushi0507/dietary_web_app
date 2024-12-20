import React from "react";
import AppTheme from "./components/AppTheme";
import { CssBaseline } from "@mui/material";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Card from "./components/Card";

const LandingPage = (props) => {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Hero />
            <Features />
            <Card />
        </AppTheme>
    )
};

export default LandingPage;