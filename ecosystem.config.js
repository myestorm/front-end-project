const info = require('./package.json')

module.exports = {
  apps: [{
    name: info.name,
    script: './dist/server/app.js',
    env: {
      COMMON_VARIABLE: true
    },
    env_prd: {
      NODE_ENV: 'prd'
    },
    env_pp: {
      NODE_ENV: 'pp'
    },
    env_qa: {
      NODE_ENV: 'qa'
    },
    env_dev: {
      NODE_ENV: 'dev'
    },
    watch: '.',
    ignore_watch: ['node_modules', 'resource/uploads']
  }]
};
