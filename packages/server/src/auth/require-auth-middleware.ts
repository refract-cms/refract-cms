import { NextFunction, Request, Response } from 'express';
import { tokenService } from './token-service';
import { ServerConfig } from '../config/server-config';

export const requireAuth = (serverConfig: ServerConfig) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateToken = (req: Request) => {
      if (req.headers.authorization) {
        const tokenData = tokenService.verify(req.headers.authorization, serverConfig);
        if (tokenData) {
          req['user'] = tokenData;
          return tokenData;
        }
      }
      return null;
    };

    const validMember = validateToken(req);
    if (!validMember) {
      console.log('Request unauthorized');
      res.status(401).send('Unauthorized');
    } else {
      // console.log(`Serving verified user: ${validMember.nameid}`);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error,
      message: 'Unauthorized',
    });
  }
};
