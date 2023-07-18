const Dotenv = require('dotenv-webpack');

module.exports = (config) => {
  config.plugins.push(
    new Dotenv({
      systemvars: true,
      path: 'apps/frontend/client/.env',
    })
  );

  return config;
};
