"use client";
import Link from '@/components/atoms/Link';
import { Box, Container, Typography, Grid2 as Grid, Card, CardContent, Icon } from '@mui/material';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import LandingPage from '@/components/templates/landingpage/LandingPage';

export default function Home() {
  const router = useRouter();

  const handleDoAppButton = () => {
    router.push("/register_login");
  }
  return (
    <>
      <LandingPage/>
      
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