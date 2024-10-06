import Button from "@/components/atoms/Button";
import TextInput from "@/components/atoms/TextInput";
import Title from "@/components/atoms/Title";
import React from "react";
import styled from "styled-components";

const PasswordResetRequest = ({ onBackClick }) => {
    const onClickSend = () => {
        console.log("送信ボタンが押されました");
    }
    return (
        <>
            <Title level={2}>
                パスワードをリセットする
            </Title>
            <InputForm>
                <TextInput
                    type="email"
                    placeholder="メールアドレス"
                    name="email"
                    required={true}
                    pattern=""
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