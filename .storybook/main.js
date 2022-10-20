const path = require('path')
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve.alias['style'] = path.join(__dirname, '../src/style');
    return config;
  },
}