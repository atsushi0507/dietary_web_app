"use client";
import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import Button from "../atoms/Button";

const Header = () => {
    const clickLogoutButton = () => {
        // ログアウトロジックを実装する
        console.log("ログアウトボタンが押されました");
    }

    return (
        <HeaderContaint>
            <Logo>アプリのタイトルロゴ</Logo>
            <Nav>
                <Link to="/" external={false}>ホーム</Link>
                <Link to="/history" external={false}>履歴・登録</Link>
                <Link to="/dashboard" external={false}>ダッシュボード・評価</Link>
            </Nav>
            <Button onClick={clickLogoutButton}>ログアウト</Button>
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
`

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

const Nav = styled.nav`
    display: flex;
    gap: 1.5rem;
`