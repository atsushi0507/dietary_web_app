"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/Button";
import { Typography } from "@mui/material";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useRouter } from "next/navigation";
import BasicAlert from "@/components/atoms/Alert";

const Main = ({ onRegisterClick, onResetClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failedLoggedIn, setFailedLoggedIn] = useState(null);
    const router = useRouter();

    const onClickLoginButton = async () => {
        if (!email || !password) {
            alert("メールアドレスとパスワードを入力してください。");
            return ;
        };
        try {
            // 永続的なログインを設定
            await setPersistence(auth, browserLocalPersistence);
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(`ログイン成功: ${userCredential.user}`);
            router.push("/home");
        } catch(error) {
            // 画面上にもログインに失敗しましたを出す
            setFailedLoggedIn(true);
            console.error("ログインに失敗しました");
        }
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
                {failedLoggedIn && <BasicAlert severity={"error"} message={"ログインに失敗しました"} />} 
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