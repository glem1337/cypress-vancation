// eslint-disable-next-line import/no-extraneous-dependencies
const { GoogleSocialLogin } = require('cypress-social-logins').plugins;

module.exports = (on) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');

      return launchOptions;
    }
  });
  on('task', {
    GoogleSocialLogin,
  });
};
