module.exports = {
  configureCli: config => ({
    ...config,
    path: (config.path || "/").replace(/\/$/, "")
  }),
  configureCliServer: config => config
};
