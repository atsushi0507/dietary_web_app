"use client";
import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/Button";
import Link from "@/components/atoms/Link";
import { FormLabel, Typography } from "@mui/material";
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
        <Card>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: "100%", fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                ログイン
            </Typography>
            <LoginForm>
                <InputArea>
                    <FormLabel htmlFor="email">メールアドレス</FormLabel>
                    <TextInput
                        placeholder="your@email.com"
                        name="email"
                        type="email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormLabel htmlFor="password">パスワード</FormLabel>
                    <TextInput
                        placeholder="パスワード"
                        name="password"
                        type="password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputArea>
                <Button onClick={onClickLoginButton}>
                    ログイン
                </Button>
                {failedLoggedIn && <BasicAlert severity={"error"} message={"ログインに失敗しました"} />} 
                <div onClick={onResetClick}>
                    <StyledLink>
                        パスワードを忘れましたか？
                    </StyledLink>
                </div>
            </LoginForm>

            <div>
                <Typography sx={{textAlign: "center"}}>
                    まだアカウントをお持ちではありませんか？ {
                        <div onClick={onRegisterClick}>
                            <StyledLink>
                                ユーザー登録へ
                            </StyledLink>
                        </div>
                    }
                </Typography>
            </div>
        </Card>
    );
};

export default Main;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 24px;
`

const Card = styled.div`
    display: 'flex';
    flex-direction: 'column';
    align-self: 'center';
    width: '100%';
    padding: 4px;
    gap: 4px;
    margin: 'auto';
    box-shadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
`

const StyledLink = styled.p`
  text-decoration: underline;
  color: #333;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: #3f3f3f; /* ホバー時に少し濃い色に変更 */
    text-decoration: none; /* ホバー時にアンダーラインを消す */
  }

  &:active {
    color: #00376d; /* アクティブ時の色 */
  }
`;