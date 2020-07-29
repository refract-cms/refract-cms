import express from 'express';
import { refractCmsHandler } from '@refract-cms/server';
import { config } from '../config';

const app = express();

app.use(
  ...refractCmsHandler({
    serverConfig: {
      rootPath: '/cms',
      config,
      mongoConnectionString: process.env.MONGO_URI,
      auth: {
        adminCredentials: {
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        },
        jwt: {
          issuer: 'my-app',
          secret: process.env.JWT_SECRET,
        },
      },
    },
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
