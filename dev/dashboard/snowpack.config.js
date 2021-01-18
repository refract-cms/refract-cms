/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
    '../../packages/core': { url: '/packages/core' },
    '../../packages/dashboard': { url: '/packages/dashboard' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    external: [
      'child_process',
      'typesafe-actions',
      'typesafe-actions/dist/types',
    ],
    polyfillNode: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    '@refract-cms/core': '../../packages/core/src',
    '@refract-cms/dashboard': '../../packages/dashboard/src',
    // '@refract-cms/server': '../../packages/server/src',
  },
};