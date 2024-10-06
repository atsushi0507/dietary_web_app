import Title from "@/components/atoms/Title";
import CheckBox from "@/components/atoms/CheckBox";
import TextInput from "@/components/atoms/TextInput";
import Link from "@/components/atoms/Link";
import React from "react";
import styled from "styled-components";
import Button from "@/components/atoms/Button";

const TmpRegister = ({ onBackClick }) => {
    const onClickRegister = () => {
        console.log("登録ボタンが押されました");
    }
    return (
        <>
            <Title level={2}>
                仮登録
            </Title>
            <InputForm>
                <TextInput
                    type="email"
                    placeholder="メールアドレス"
                    name="email"
                    required={true}
                    pattern=""
                />
                <TextInput
                    type="password"
                    placeholder="パスワード"
                    name="password"
                    required={true}
                    pattern=""
                />
                <TextInput
                    type="password"
                    placeholder="パスワード(確認用)"
                    name="valid_pw"
                    required={true}
                    pattern=""
                />
                <CheckBox
                    label={`${<Link to='/' external={false}>利用規約</Link>}に同意します`}
                    name="terms"
                />
                <CheckBox
                    label={`${<Link to='/' external={false}>個人情報保護ポリシー</Link>}に同意します`}
                    name="terms"
                />
                <Button onClick={onClickRegister}>
                    登録する
                </Button>
            </InputForm>
            <Button onClick={onBackClick}>
                戻る
            </Button>
        </>
    );
};

export default TmpRegister;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
`