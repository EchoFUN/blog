module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'yymg',
      script: './bin/www',
      env: {
        "NODE_ENV": "production",
      },

      instances: -1,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/node/err.log',
      merge_logs: true,
      out_file: '/var/log/node/out.log'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
    },

    dev: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env dev",
      env: {
        NODE_ENV: "dev"
      }
    }
  }
}