const Promise = require('bluebird');
const fs = require('fs');
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const { enrich, simplify } = require('./helpers');
const _ = require('lodash');

// command line argument
const argumentOne = process.argv.slice(2)[0];

const OUTPUT_PATH = `${__dirname}/../../data/formatted`;
// changes name of file to read based on passed in command line arg
const FILE_NAME = argumentOne === 'dev'
  ? 'pre_enriched_sample.json' : 'pre_enriched.json';

const INPUT_PATH = `${__dirname}/../../data/formatted/${FILE_NAME}`

console.log(`Reading file: ${INPUT_PATH}`);
readFile(INPUT_PATH, 'utf8')
  .then(file => {
    console.log('File read');
    const { data } = JSON.parse(file);
    console.log('Enriching documents');
    /*
    For the combined call, are they done in parallel or in series?
    If they are done in series, I could write code here so that they
    are done in parallel, it wouldn't be all that difficult using the
    bluebird promise library, it would just be many most async calls here
    */
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
    // TODO: write function that accepts 2 iterables and a fn, applies the fn
    // to both iterables - would be very useful for dealing with promise control flow
    for (let i = 0; i < docs.length && enrichments.length; i++) {
      _.assignIn(docs[i], enrichments[i])
    }
    return docs;
  })
  .then(docs => {
    // write file
    console.log('Writing file');
    // change name of file based on supplied argument
    const fileName = argumentOne === 'dev'
      ? 'enriched_sample.json' : 'enriched.json';
    const json = JSON.stringify({ data: docs });
    const path = `${OUTPUT_PATH}/${fileName}`;
    return Promise.all([fileName, writeFile(path, json)]);
  })
  .then(data => console.log(`Complete build: data/formatted/${data[0]}`))
  .catch(err => console.log(err));
