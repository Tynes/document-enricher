const Promise = require('bluebird');
const fs = require('fs');
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const { enrich, simplify } = require('./helpers');
const _ = require('lodash');

const argumentOne = process.argv.slice(2)[0];

const OUTPUT_PATH = `${__dirname}/../../data/formatted`;
const FILE_NAME = argumentOne === 'dev'
  ? 'pre_enriched_sample.json' : 'pre_enriched.json';

const INPUT_PATH = `${__dirname}/../../data/formatted/${FILE_NAME}`

console.log(`Reading file: ${INPUT_PATH}`);
readFile(INPUT_PATH, 'utf8')
  .then(file => {
    console.log('File read');
    const { data } = JSON.parse(file);
    console.log('Enriching documents');
    const enrichedDocs = Promise.map(data, datum => enrich(datum.text));
    return Promise.all([data, enrichedDocs])
  })
  .then(data => {
    console.log('Building enriched documents');
    const docs = data[0];
    // de-nest data
    const simplifiedEnrichments = data[1].map(el => simplify(el));
    // remove the keys that aren't needed
    const removeFields = ['status', 'usage', 'totalTransactions',
                          'entities', 'concepts', 'docSentiment'];
    const enrichments = simplifiedEnrichments.map(d => _.omit(d, removeFields));
    // add the enrichments to the docs
    for (let i = 0; i < docs.length && enrichments.length; i++) {
      _.assignIn(docs[i], enrichments[i])
    }
    return docs;
  })
  .then(docs => {
    // write file
    console.log('Writing file');
    const fileName = argumentOne === 'dev'
      ? 'enriched_sample.json' : 'enriched.json';
    const json = JSON.stringify({ data: docs });
    const path = `${OUTPUT_PATH}/${fileName}`;
    return Promise.all([fileName, writeFile(path, json)]);
  })
  .then(data => console.log(`Complete build: data/formatted/${data[0]}`))
  .catch(err => console.log(err));
