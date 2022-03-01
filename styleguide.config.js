const path = require('path');

module.exports = {
  assetsDir: 'public',
  pagePerSection: true,
  sections: [
    {
      name: 'Components',
      usageMode: 'collapse', // 'hide' | 'collapse' | 'expand',
      exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
      components: ['styleguidist/components/**/*.{js,jsx}'],
      ignore: [],
    },
    {
      name: 'Layout',
      usageMode: 'collapse', // 'hide' | 'collapse' | 'expand',
      exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
      components: ['styleguidist/layout/**/*.{js,jsx}'],
      ignore: [],
    },
  ],
  require: [
    path.join(__dirname, 'assets/styles/application.less'),
  ],
  webpackConfig: {
    devServer: {
      clientLogLevel: 'warn',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(css|less)$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        },
      ],
    },
  },
};
