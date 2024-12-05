"use client";
import Main from '@/components/templates/home/main';
import React from 'react';
import withAuth from '@/hoc/withAuth';

const HomeMain = () => {

  return (
    <>
        <Main />
    </>
  );
}

export default withAuth(HomeMain);