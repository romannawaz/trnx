const Dotenv = require('dotenv-webpack');

module.exports = (config) => {
  config.plugins.push(
    new Dotenv({
      path: 'apps/frontend/client/.env',
    })
  );

  return config;
};
