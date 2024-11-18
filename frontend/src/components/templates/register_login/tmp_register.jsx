import Title from "@/components/atoms/Title";
import CheckBox from "@/components/atoms/CheckBox";
import TextInput from "@/components/atoms/TextInput";
import Link from "@/components/atoms/Link";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import useEmailValidation from "@/hooks/useEMailValidation";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { Typography } from "@mui/material";

const TmpRegister = ({ onBackClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid_pw, setValidPw] = useState("");

    const {isValidEmail, validateEmail} = useEmailValidation();
    const {isValidPassword, validatePassword} = usePasswordValidation();

    const isMatchedPassword = ({password, valid_pw}) => {
        if (password === valid_pw) {
            return true;
        } else {
            return false;
        }
    }

    const onClickRegister = async () => {
        if (!email || !password || !valid_pw) {
            alert("すべてのフィールドを入力してください");
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            alert("確認メールを送信しました。メールボックスを確認してください");
        } catch(error) {
            alert("登録中にエラーが発生しました：" + error.message);
        }
    }

    return (
        <>
            <Typography variant="h6">
                仮登録
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
                <TextInput
                    type="password"
                    placeholder="パスワード"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => validatePassword(password)}
                />
                <TextInput
                    type="password"
                    placeholder="パスワード(確認用)"
                    name="valid_pw"
                    value={valid_pw}
                    required={true}
                    onChange={(e) => setValidPw(e.target.value)}
                    onBlur={() => isMatchedPassword({password, valid_pw})}
                />
                <CheckBox
                    label={
                        <>
                            <Link to="/" external={false}>利用規約</Link>に同意します
                        </>
                    }
                    name="terms"
                />
                <CheckBox
                    label={
                        <>
                            <Link to="/" external={false}>個人情報保護ポリシー</Link>に同意します
                        </>
                    }
                    name="policy"
                />
                <Button onClick={onClickRegister} disabled={!(isValidEmail && isValidPassword && isMatchedPassword({password, valid_pw}))}>
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