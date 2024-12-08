"use client"; // クライアントサイドで動作することを宣言
import React, { useState } from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation"; // クライアントサイドでのみ動作するフック
import { useAuth } from "@/contexts/authContext";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import BasicAlert from "../atoms/Alert";
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

import { Box, Avatar, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";

const settings = ["個人設定", "ログアウト"];

const Header = () => {
    const router = useRouter();
    const { isLoggedIn = false } = useAuth();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const clickLogoutButton = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            <BasicAlert severity={"error"} message={"ログアウトに失敗しました"} />
            console.error("ログアウトに失敗しました");
        }
    };

    const clickLoginButton = () => {
        router.push('/register_login'); // クライアントサイドでページ遷移
    };

    const clickLogo = () => {
        router.push('/'); // ロゴクリックでトップページに遷移
    };

    return (
        <HeaderContaint>
            <Logo onClick={clickLogo}>
                <LogoImage src="/sample_logo.png" alt="アプリロゴ" />
            </Logo>
            <Nav>
                <Link to="/home" external={false}>ホーム</Link>
                <Link to="/record" external={false}>記録</Link>
                <Link to="/summary" external={false}>サマリー</Link>
            </Nav>

            {/* ユーザーメニュー */}
            <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn ? (
                    // ログインしている場合のメニュー
                    <>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    <SettingsIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                key={setting}
                                onClick={() => {
                                    handleCloseUserMenu();
                                    if (setting === "個人設定") {
                                        router.push("/settings");
                                    } else if (setting === "ログアウト") {
                                        clickLogoutButton();
                                    }
                                }}
                            >
                                <Box sx={{ textAlign: "center", width: "100%" }}>
                                    {setting}
                                </Box>
                            </MenuItem>                                                        
                            ))}
                        </Menu>
                    </>
                ) : (
                    // ログインしていない場合のアイコン
                    <Tooltip title="ログイン">
                        <IconButton onClick={clickLoginButton} sx={{ p: 0 }}>
                            <Avatar>
                                <LoginIcon />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

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
    cursor: pointer; /* クリック可能にするためにカーソルをポインターに */
`;

const LogoImage = styled.img`
    height: 60px; /* ロゴ画像の高さ */
    width: auto; /* アスペクト比を維持 */
`;

const Nav = styled.nav`
    display: flex;
    gap: 1.5rem;
`;
