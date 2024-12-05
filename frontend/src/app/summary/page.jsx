"use client";
import Main from "@/components/templates/summary/main";
import React from "react";
import withAuth from "@/hoc/withAuth";

const Summary = () => {
    return (
        <>
            <Main />
        </>
    );
};

export default withAuth(Summary);