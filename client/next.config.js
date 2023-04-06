const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  env: {
    CLIENT_ID:process.env.CLIENT_ID,
    API_KEY: process.env.API_KEY
  }
}