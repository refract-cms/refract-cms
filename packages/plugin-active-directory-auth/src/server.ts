import { createServerPlugin } from '@refract-cms/server';
import { activeDirectoryPluginConfig } from './';
import passport, { AuthenticateOptions } from 'passport';
import { OIDCStrategy } from 'passport-azure-ad';

export const activeDirectoryServerPlugin = createServerPlugin(activeDirectoryPluginConfig, {
  events: {
    onSchemaBuilt: () => console.log('hi from ad plugin'),
  },
  configureRouter: (router) => {
    const tenantId = '';
    const clientId = '';
    const clientSecret = '';
    passport.use(
      new OIDCStrategy(
        {
          redirectUrl: 'http://localhost:4100/cms/graphql',
          allowHttpForRedirectUrl: true,
          clientID: clientId,
          clientSecret: clientSecret,
          // oidcIssuer: appSettings.auth.tenant,
          identityMetadata: `https://login.microsoftonline.com/${tenantId}/.well-known/openid-configuration`,
          // skipUserProfile: true,
          responseType: 'code id_token',
          responseMode: 'query',
          passReqToCallback: false,
        },
        () => true
      )
    );

    router.get('/', (req, res) => {
      res.send('hi2');
    });

    router.get('/login', (req, res, next) => {
      const options: AuthenticateOptions & any = {
        failureRedirect: '/error',
        session: false,
        customState: `_redirectUrl=${req.query.redirectUrl}`,
      };
      return passport.authenticate('azuread-openidconnect', options)(req, res, next);
    });
  },
});
