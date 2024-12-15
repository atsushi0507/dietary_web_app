import Button from "@/components/atoms/Button";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Card = () => {
    const router = useRouter();

    const handleButton = () => {
        router.push("register_login");
    }
    return (
        <Container>
            <Stack
                spacing={2}
                useFlexGap
                sx={{ alignItems: "center", width: {xs: "100%", sm: "70%"}}}
            >
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        display: "flex",
                        flexDirection: {sx: "column", sm: "row"},
                        alignItems: "center"
                    }}
                >
                    食生活を変える<br/>第一歩を踏み出そう
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        width: {sm: "100%", md: "80%"}
                    }}
                >
                毎日の食事を記録し、カロリーや栄養バランスを可視化。健康的な食生活を実現するための具体的なアドバイスで、理想の自分に一歩近づきましょう。
                </Typography>
                <Button onClick={handleButton}>
                    始めてみる
                </Button>
            </Stack>
        </Container>
    );
};

export default Card;

const Container = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    border: 2px solid #ccc;
    width: 95%;
    height: auto;
    display: flex;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin: 8px;
`