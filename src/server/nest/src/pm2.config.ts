// tslint:disable-next-line
const ignore_watch = ['[\\/\\\\]\\./', 'node_modules', 'logs'];

const pm2config = {
  exec_mode: 'fork',
  instances: 'max',
  watch: false,
  ignore_watch,
  log_date_format: 'YYYY-MM-DD HH:mm:ss',
  env: {
    NODE_ENV: 'development',
  },
  env_production: {
    NODE_ENV: 'production',
  },
  kill_timeout: 5000,
  // listen_timeout: 3000,
  // restart_delay: 4000,
  // exp_backoff_restart_delay: 5000,
  // error_file: 'err.log',
  // out_file: 'out.log',
  // log_file: 'combined.log',
};

module.exports = {
  apps: [
    {
      ...pm2config,
      name: 'server',
      script: './main.js',
      exec_mode: 'cluster',
      instances: 'max',
    },
    {
      ...pm2config,
      name: 'proxy2',
      script: './proxy2.js',
    },
  ],
};
