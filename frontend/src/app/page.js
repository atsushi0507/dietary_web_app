"use client";
import Link from '@/components/atoms/Link';
import { Box, Container, Typography, Grid2 as Grid, Card, CardContent, Icon } from '@mui/material';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();

  const handleDoAppButton = () => {
    router.push("/register_login");
  }
  return (
    <>
      {/* ヒーローセクション */}
      <Box sx={{ backgroundImage: 'url(https://source.unsplash.com/random)', backgroundSize: 'cover', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            食事を簡単に管理して、目指す健康的なバランスを
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            カロリーとPFCバランスを一目でチェック。簡単な記録で長期的な健康を支援します
          </Typography>
          <Button onClick={handleDoAppButton}>
            アプリを始める
          </Button>
        </Container>
      </Box>

      {/* アプリの特徴セクション */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>アプリの特徴</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Icon sx={{ fontSize: 50, color: 'primary.main' }}>check_circle</Icon>
                <Typography variant="h6" sx={{ mt: 2 }}>シンプルな操作</Typography>
                <Typography sx={{ mt: 1 }}>
                  わかりやすく、誰でも簡単に始められる食事記録機能。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Icon sx={{ fontSize: 50, color: 'primary.main' }}>dashboard</Icon>
                <Typography variant="h6" sx={{ mt: 2 }}>PFCバランス重視</Typography>
                <Typography sx={{ mt: 1 }}>
                  食事を長期的に見守り、PFCバランスを最適化。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Icon sx={{ fontSize: 50, color: 'primary.main' }}>assessment</Icon>
                <Typography variant="h6" sx={{ mt: 2 }}>長期的な安定をサポート</Typography>
                <Typography sx={{ mt: 1 }}>
                  食事内容を定期的に評価し、健康的な改善をサポートします。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 実際の利用シーンセクション */}
      <Box sx={{ backgroundColor: '#f7f7f7', py: 6 }}>
        <Container>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>実際に使ってみると</Typography>
          <Grid container spacing={4}>
            <Grid xs={12} md={6}>
              <img src="https://source.unsplash.com/random" alt="食事の例" style={{ width: '100%', borderRadius: 8 }} />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="body1">
                あなたの食事記録を元に、カロリーやPFCバランスを評価し、毎日のフィードバックが得られます。
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      CTAセクション
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>健康的な食生活を始めよう！</Typography>
        <Button onClick={handleDoAppButton}>
          今すぐ始める
        </Button>
      </Box>
      
      <Footer>
        <Copyright>&copy; 2024 Atsushi Mizukami. All rights reserved.</Copyright>
        <p>
          <Link to="/terms_of_service" external={false}>利用規約</Link> | 
          <Link to="/privacy_policy" external={false}>個人情報保護ポリシー</Link>
        </p>
        <p>Design and Development by Atsushi Mizukami</p>
      </Footer>
    </>
  );
}


const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`

const Copyright = styled.p`
  margin: 10px 0;
`;