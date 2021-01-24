import React from 'react';
import { Dashboard } from '@refract-cms/dashboard';
import { config } from '@local/config';
import Head from 'next/head';

export const CmsDashboard = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Dashboard config={config} serverUrl={process.env.NEXT_PUBLIC_API_ROOT!} rootPath="/admin" homePageUrl="/" />
    </>
  );
};
