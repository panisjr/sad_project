const { Client } = require('@bugsnag/js');

const bugsnag = new Client({
  apiKey: 'YOUR_BUGSNAG_API_KEY'
  // Add more configuration options if needed
});

module.exports = bugsnag;
