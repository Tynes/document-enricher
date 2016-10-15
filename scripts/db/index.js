const { createIndex, addBulkDocuments } = require('./helpers');
// Using the enriched sample data
// change this path to bulk add different documents
const { data } = require('../../data/formatted/enriched_sample.json');

// change these constants to bulk add to a different
// type of different index
const INDEX = 'news';
const TYPE = 'article';

createIndex(INDEX)
  .then(response => {
    console.log(`Index created: ${INDEX}`);
    return addBulkDocuments(data, INDEX, TYPE);
  })
  .then(response => {
    console.log(`Complete`);
  })
  .catch(err => console.log(`Error: ${err}`));
