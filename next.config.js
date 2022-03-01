const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withFonts = require('next-fonts');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const skipAntStyles = (config) => {
  const antStyles = /antd\/.*?\/style\/css.*?/;
  const origExternals = [...config.externals];
  // eslint-disable-next-line no-param-reassign
  config.externals = [
    // eslint-disable-next-line consistent-return
    (context, request, callback) => {
      if (request.match(antStyles)) return callback();
      if (typeof origExternals[0] === 'function') {
        origExternals[0](context, request, callback);
      } else {
        callback();
      }
    },
    ...(typeof origExternals[0] === 'function' ? [] : origExternals),
  ];
  config.module.rules.unshift({
    test: antStyles,
    use: 'null-loader',
  });
};

const addPolyfills = (config) => {
  const originalEntry = config.entry;
  // eslint-disable-next-line no-param-reassign
  config.entry = async () => {
    const entries = await originalEntry();

    if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
      entries['main.js'].unshift('./client/polyfills.js');
    }

    return entries;
  };
};

const nextConfig = {
  webpack: (config, options) => {
    addPolyfills(config);

    if (options.isServer) {
      skipAntStyles(config);
    }

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
      use: [options.defaultLoaders.babel],
    });

    config.plugins.push(new options.webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new options.webpack.IgnorePlugin(/\/cypress\//));
    config.plugins.push(new MomentLocalesPlugin());

    // eslint-disable-next-line no-param-reassign
    config.optimization.minimizer.push(new OptimizeCssAssetsPlugin());
    // eslint-disable-next-line no-param-reassign
    config.optimization.minimize = process.env.NODE_ENV === 'production';
    // eslint-disable-next-line no-console
    console.log('nextConfig build data', {
      'process.env.NODE_ENV': process.env.NODE_ENV,
    });

    return config;
  },
};

module.exports = withPlugins([
  [withFonts, {
    enableSvg: true,
  }],
  [withCss],
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  }],
], nextConfig);
