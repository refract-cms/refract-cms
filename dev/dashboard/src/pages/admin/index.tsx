import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// @ts-ignore
const Dashboard = dynamic(() => import('../../components/CmsDashboard').then((m) => m.CmsDashboard), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <Dashboard />
    </div>
  );
}
