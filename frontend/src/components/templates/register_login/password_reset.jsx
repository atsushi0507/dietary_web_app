"use client";
import BasicAlert from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import TextInput from "@/components/atoms/TextInput";
import React from "react";
import styled from "styled-components";
import { useState } from "react";

const PasswordReset = () => {
    const [status, setStatus] = useState("ok");
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
                    placeholder="パスワード"
                    required={true}
                    pattern=""
                />
                <TextInput
                    type="password"
                    name="password_valid"
                    placeholder="パスワード(確認用)"
                    required={true}
                    pattern=""
                />
                <Button onClick={onClickButton}>
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