import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../theme';
import { Button } from '@material-ui/core';

const features = [
  {
    title: 'Config as code',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: <>All Refract CMS config is done in Typescript.</>,
  },
  {
    title: 'Custom editor components',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>Write your own custom editor components in React, when the built in inputs don't fulfill all your needs!</>
    ),
  },
  {
    title: 'Clean database',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>Clean database. Refract CMS only creates one mongo collection per schema, and only contains field data.</>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <ThemeProvider theme={theme}>
      <Layout title={`${siteConfig.title}`} description="Description will go into a meta tag in <head />">
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
          <div className="container">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                // className={clsx('button button--outline button--secondary button--lg', styles.getStarted)}
                to={useBaseUrl('docs/')}
              >
                <Button variant="contained" color="inherit">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main>
          {features && features.length > 0 && (
            <section className={styles.features}>
              <div className="container">
                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
