"use client";
import RecordTop from '@/components/templates/record/main';
import withAuth from '@/hoc/withAuth';
import React from 'react';

const Page = () => {
  return (
    <>
        <RecordTop />
    </>
  );
};

export default withAuth(Page);