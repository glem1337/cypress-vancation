/* eslint-disable import/no-extraneous-dependencies */
import { loadEnvConfig } from '@next/env';

module.exports = () => {
  process.env.TZ = 'UTC';
  loadEnvConfig(process.cwd());
};
