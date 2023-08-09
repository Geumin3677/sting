const withPWA = require('next-pwa')({
  dest: 'public',
  reactStrictMode: true,
})

module.exports = withPWA(this.output='export')
