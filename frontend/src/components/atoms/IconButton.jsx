import React, { useState } from 'react';
import { Box, Typography } from '@mui/material'; // MUI を使用する場合
import styled from 'styled-components';

const IconButton = ({ text, icon, onClick, isactive }) => {
  return (
    <SBox
      onClick={onClick}
      isactive={isactive.toString()}
    >
      <Typography variant="h6" sx={{ marginBottom: '8px' }}>
        {text}
      </Typography>
      <Box
        sx={{
          fontSize: '32px',
          color: '#888',
        }}
      >
        {icon || '+'}
      </Box>
    </SBox>
  );
};

export default IconButton;

const SBox = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: ${({ isactive }) => (isactive === "true" ? "#007bff" : "transparent")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`