"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import Link from "@/components/atoms/Link";
import { Typography } from "@mui/material";

const Main = ({ onRegisterClick, onResetClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onClickLoginButton = () => {
        console.log("ログインボタンが押されました");
    }

    return (
        <>
            <Typography variant="h4">
                ログイン
            </Typography>
            <LoginForm>
                <TextInput
                    placeholder="メールアドレス"
                    name="email"
                    type="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                    placeholder="パスワード"
                    name="password"
                    type="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={onClickLoginButton}>
                    ログイン
                </Button>
            </LoginForm>
            <Button onClick={onResetClick}>
                パスワードを忘れましたか？
            </Button>
            <Typography variant="h6">
                ユーザー登録
            </Typography>
            <Typography sx={{textAlign: "center"}}>
                n ステップで簡単登録
            </Typography>
            <Button onClick={onRegisterClick}>
                ユーザー登録へ
            </Button>
        </>
    );
};

export default Main;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
`