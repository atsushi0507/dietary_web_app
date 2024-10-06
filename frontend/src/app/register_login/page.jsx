"use client";
import React, { useState } from "react";
import Main from "@/components/templates/register_login/main";
import TmpRegister from "@/components/templates/register_login/tmp_register";
import PasswordResetRequest from "@/components/templates/register_login/password_reset_request";

const RegisterLoginPage = () => {
    const [pageState, setPageState] = useState("main");

    return (
        <>
            {pageState === "main" && (
                <Main
                    onRegisterClick={() => setPageState("register")}
                    onResetClick={() => setPageState("reset")}
                />
            )}
            {pageState === "register" && <TmpRegister onBackClick={() => setPageState("main")} />}
            {pageState === "reset" && <PasswordResetRequest onBackClick={() => setPageState("main")} />}
        </>
    );
}

export default RegisterLoginPage;