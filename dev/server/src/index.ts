import express from 'express';
import { refractCmsMiddleware, ContentService } from '@refract-cms/server';
import { serverConfig } from './server-config';
import cors from 'cors';
import chalk from 'chalk';
import { ArticleSchema } from '@local/config/schemas/article-schema';

const app = express();

app.use(cors());

app.use('/cms', refractCmsMiddleware({ serverConfig }));

app.listen(4100, () => {
  console.log(`API listening on port 4100`);
  if (process.env.NODE_ENV === 'development') {
    console.log(
      chalk.magenta(
        `Login to the dashboard with ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
      ),
      chalk.magenta(`GraphQL API running at http://localhost:4100/cms/graphql`)
    );
  }
});

app.get('/api/articles/:id', async (req, res) => {
  const articleContent = new ContentService(ArticleSchema, serverConfig);
  const article = await articleContent.getById({ id: req.params.id, locale: 'dk' });
  res.send(article);
});
