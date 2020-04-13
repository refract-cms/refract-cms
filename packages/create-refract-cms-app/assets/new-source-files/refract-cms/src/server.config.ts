import { configureCliServer } from '@refract-cms/cli';
import dotenv from 'dotenv';
dotenv.config();

export default configureCliServer({
  mongoConnectionString: process.env.MONGO_URI,
  auth: {
    adminCredentials: {
      username: 'admin',
      password: 'pw'
    },
    jwt: {
      issuer: 'consumer',
      secret: 'secret1'
    }
  },
  plugins: []
});
