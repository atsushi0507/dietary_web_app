import CheckBox from "@/components/atoms/CheckBox";
import TextInput from "@/components/atoms/TextInput";
import Link from "@/components/atoms/Link";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import useEmailValidation from "@/hooks/useEMailValidation";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { FormLabel, Typography } from "@mui/material";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const TmpRegister = ({ onBackClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid_pw, setValidPw] = useState("");
    const [isCheckedTerms, setIsCheckedTerms] = useState(false);
    const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);

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

            const actionCodeSetting = {
                url: "https://dietary-web-app-6024a.web.app/initial_setting",
                handleCodeInApp: true
            };

            await sendEmailVerification(user, actionCodeSetting)
            .then(() => {
                console.log('Verification email sent.');
              })
              .catch((error) => {
                console.error('Error sending email verification:', error);
              });

            alert("確認メールを送信しました。30 分以内に登録を完了してください。");
        } catch(error) {
            alert("登録中にエラーが発生しました：" + error.message);
        }
    }

    return (
        <Card>
            <Typography variant="h6">
                仮登録
            </Typography>
            <InputForm>
                <FormLabel htmlFor="email">メールアドレス</FormLabel>
                <TextInput
                    type="email"
                    placeholder="your@mail.com"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => validateEmail(email)}
                />
                <FormLabel htmlFor="password">パスワード</FormLabel>
                <TextInput
                    type="password"
                    placeholder="8〜64文字、英字・数字・記号を含む"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => validatePassword(password)}
                />
                <FormLabel htmlFor="valid_password">パスワード(確認用)</FormLabel>
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
                            <Link to="/terms_of_service" external={true}>利用規約</Link>に同意します
                        </>
                    }
                    name="terms"
                    onChange={(e) => setIsCheckedTerms(e.target.checked)}
                />
                <CheckBox
                    label={
                        <>
                            <Link to="/privacy_policy" external={true}>個人情報保護ポリシー</Link>に同意します
                        </>
                    }
                    name="policy"
                    onChange={(e) => setIsCheckedPolicy(e.target.checked)}
                />
                <Button
                    onClick={onClickRegister}
                    disabled={!(
                        isValidEmail &&
                        isValidPassword &&
                        isMatchedPassword({password, valid_pw}) &&
                        isCheckedTerms &&
                        isCheckedPolicy
                    )}
                >
                    登録する
                </Button>
            </InputForm>
            <Button onClick={onBackClick}>
                戻る
            </Button>
        </Card>
    );
};

export default TmpRegister;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
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