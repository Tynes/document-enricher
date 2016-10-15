const elasticsearch = require('elasticsearch');

// use process.env if test here

var client = new elasticsearch.Client({  
  host: 'localhost:9200',
  log: 'trace',
});

module.exports = client;
