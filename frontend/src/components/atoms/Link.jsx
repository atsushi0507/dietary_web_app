import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = ({ to, external, children }) => {
  if (external) {
    return <SLink href={to} target="_blank" rel="noopener noreferrer">{children}</SLink>;
  }
  return <RouterLink to={to}>{children}</RouterLink>;
};

export default Link;

const SLink = styled.a`
`