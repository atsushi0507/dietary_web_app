"use client"; // クライアントサイドで動作することを宣言

import React, { useState } from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation"; // クライアントサイドでのみ動作するフック

const Header = () => {
    const router = useRouter(); // クライアント側で動作するはず
    const [isLogin, setIsLogin] = useState(false);

    const clickLogoutButton = () => {
        console.log("ログアウトボタンが押されました");
        // ログアウト処理の実装を行う
    };

    const clickLoginButton = () => {
        router.push('/register_login'); // クライアントサイドでページ遷移
    };

    return (
        <HeaderContaint>
            <Logo>アプリのタイトルロゴ</Logo>
            <Nav>
                <Link to="/home" external={false}>ホーム</Link>
                <Link to="/record" external={false}>記録</Link>
                <Link to="/dashboard" external={false}>評価・ダッシュボード</Link>
            </Nav>
            {isLogin
            ? <Button onClick={clickLogoutButton}>ログアウト</Button>
            : <Button onClick={clickLoginButton}>ログイン</Button>
            }
        </HeaderContaint>
    );
};

export default Header;

const HeaderContaint = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Nav = styled.nav`
    display: flex;
    gap: 1.5rem;
`;
