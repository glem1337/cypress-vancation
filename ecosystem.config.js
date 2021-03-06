module.exports = {
  apps: [
    {
      name: 'nextjs',
      script: 'yarn start',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
