const withPWA = require('next-pwa')({
  dest: 'public',
  // customWorkerDir: 'worker',
  // register: true,
  // skipWaiting: true,
})

module.exports = withPWA()