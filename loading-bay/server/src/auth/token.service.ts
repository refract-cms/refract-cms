import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { ServerConfig } from '../config/server-config.model';
import { AuthToken } from '@refract-cms/core';

export const tokenService = {
  sign: ({ auth }: ServerConfig) => {
    const token: AuthToken = {
      nameid: '',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 120,
      iss: auth.jwt.issuer || 'refract-cms',
      aud: 'refract-cms'
    };
    return jwt.sign(token, auth.jwt.secret);
  },
  verify: (token: string, { auth }: ServerConfig) => {
    return jwt.verify(token, auth.jwt.secret) as AuthToken;
  }
};
