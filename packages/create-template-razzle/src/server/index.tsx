import express from 'express';
import { refract } from '@refract-cms/server';
import { serverConfig } from './server-config';
import { indexHtml } from './index-html';
import { constants } from '../shared/constants';

const app = express();

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

app.use(constants.refractPath, refract({ serverConfig }));

app.get('/*', indexHtml({ title: 'Refract CMS App' }));

export default app;
