"use client"; 
import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

const Link = ({ to, external, children }) => {
  if (external) {
    return <SLink href={to} target="_blank" rel="noopener noreferrer">{children}</SLink>;
  }
  return (
    <NextLink href={to} passHref>
      {/* SLink には href を付けない */}
      <SLinkAsButton>{children}</SLinkAsButton>
    </NextLink>
  );
};

export default Link;

const SLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const SLinkAsButton = styled.span`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
