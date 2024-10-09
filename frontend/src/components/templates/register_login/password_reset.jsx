"use client";
import BasicAlert from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import TextInput from "@/components/atoms/TextInput";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import usePasswordValidation from "@/hooks/usePasswordValidation";

const PasswordReset = () => {
    const [status, setStatus] = useState("ok");
    const [password, setPassword] = useState("");
    const [validPw, setValidPw] = useState("");
    const {isValidPassword, validatePassword} = usePasswordValidation();

    const isMatchedPassword = ({ password, validPw }) => {
        if (password === validPw) {
            return true;
        } else {
            return false;
        }
    }

    const onClickButton = () => {
        console.log("送信ボタンが押されました");
    }
    return (
        <>
            <Title level={2}>
                パスワードを再設定する
            </Title>
            <InputForm>
                <TextInput 
                    type="password"
                    name="password"
                    value={password}
                    placeholder="パスワード"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => validatePassword(password)}
                />
                <TextInput
                    type="password"
                    name="password_valid"
                    value={validPw}
                    placeholder="パスワード(確認用)"
                    required={true}
                    onChange={(e) => setValidPw(e.target.value)}
                />
                <Button onClick={onClickButton} disabled={!(isValidPassword && isMatchedPassword({password, validPw}))}>
                    送信
                </Button>
            </InputForm>

            {status === "ok" && <BasicAlert severity="info" message="入力されたアドレスにメールを送信しました" />}
        </>
    );
};

export default PasswordReset;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
`