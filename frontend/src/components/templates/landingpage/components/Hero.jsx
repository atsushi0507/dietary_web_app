import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@/components/atoms/Button";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();

    const handleButton = () => {
        router.push("/register_login");
    };

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: 
                "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
                ...theme.applyStyles("dark", {
                    backgroundImage:
                    "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)"
                })
            })}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: {xs: 14, sm: 20},
                    pb: {xs: 8, sm: 12}
                }}
            >
                <Stack
                    spacing={2}
                    useFlexGap
                    sx={{ alignItems: "center", width: {xs: "100%", sm: "70%"}}}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            display: "flex",
                            flexDirection: {sx: "column", sm: "row"},
                            alignItems: "center",
                            // fontSize: "clamp(3rem, 10vw, 3.5rem)"
                        }}
                    >
                        食生活を改善する
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            width: { sm: "100%", md: "80%"}
                        }}
                    >
                        食事スコアは、あなたの食事習慣をスコア化し、視覚的な分析と正確なフィードバックを提供することで、食生活の改善を促します。
                    </Typography>

                    <Button onClick={handleButton}>
                        いますぐ始める
                    </Button>
                </Stack>
                <StyledBox id="image">
                    <img src="/hero.jpg" style={{objectFit: "fill", width: "100%", height: "100%"}} />
                </StyledBox>
            </Container>
        </Box>
    );
}

export default Hero;

const StyledBox = styled('div')(({ theme }) => ({
    alignSelf: 'center',
    width: '100%',
    height: 250,
    marginTop: theme.spacing(8),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    backgroundSize: 'fill',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
      height: 700,
    },
    ...theme.applyStyles('dark', {
      boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
      outlineColor: 'hsla(220, 20%, 42%, 0.1)',
      borderColor: (theme.vars || theme).palette.grey[700],
    }),
  }));