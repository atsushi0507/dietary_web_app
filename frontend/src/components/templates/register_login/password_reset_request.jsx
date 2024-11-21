import Button from "@/components/atoms/Button";
import TextInput from "@/components/atoms/TextInput";
import Title from "@/components/atoms/Title";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
import useEmailValidation from "@/hooks/useEMailValidation";
import { auth } from "@/firebase/firebaseConfig";

const PasswordResetRequest = ({ onBackClick }) => {
    const [email, setEmail] = useState("");
    const {isValidEmail, validateEmail} = useEmailValidation();

    const onClickSend = async () => {
        if (!isValidEmail) {
            alert("有効な形式のメールアドレスを入力してください。");
            return ;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("パスワード再設定用のメールを送信しました。メールをご確認ください。");
        } catch(error) {
            console.error(error);
            alert("メールの送信に失敗しました。正しいメールアドレスを入力してください。");
        }
    }
    return (
        <>
            <Typography variant="h6">
                パスワードをリセットする
            </Typography>
            <InputForm>
                <TextInput
                    type="email"
                    placeholder="メールアドレス"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => validateEmail(email)}
                />
                <Button onClick={onClickSend}>
                    送信
                </Button>
            </InputForm>
            <Button onClick={onBackClick}>
                戻る
            </Button>
        </>
    );
};

export default PasswordResetRequest;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
`