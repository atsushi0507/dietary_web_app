import Button from "@/components/atoms/Button";
import TextInput from "@/components/atoms/TextInput";
import Title from "@/components/atoms/Title";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const PasswordResetRequest = ({ onBackClick }) => {
    const [email, setEmail] = useState("");

    const onClickSend = () => {
        console.log("送信ボタンが押されました");
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