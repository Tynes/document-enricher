const expect = require('chai').expect;
const Promise = require('bluebird');
const readdir = Promise.promisify(require('fs').readdir);
const exec = Promise.promisify(require('child_process').exec);

let data;

describe('Data Parser', function() {
  before(function(done) {
    exec('npm run build:pre-enriched')
      .then(d => {
        data = require('../data/formatted/pre_enriched.json');
        done();
      })
  });
  it('Should produce a file called pre_enriched.json', function() {
    expect(data).to.exits;
  });
  it('Should have a key called data with a value that is type array', function() {
    expect(data).to.have.property('data');
    expect(data.data).to.be.an('array');
  });
  it('The array should be the same length as the number of files in data/raw/text_data', function(done) {
    let length = 0;
    let i = 0;
    const directories = ['business', 'entertainment', 'politics', 'sport', 'tech'];
    const path = `${__dirname}/../data/raw/text_data`;
    readdir(`${path}/${directories[i++]}`)
      .then(files => {
        length += files.length;
        return readdir(`${path}/${directories[i++]}`);
      })
      .then(files => {
        length += files.length;
        return readdir(`${path}/${directories[i++]}`);
      })
      .then(files => {
        length += files.length;
        return readdir(`${path}/${directories[i++]}`);
      })
      .then(files => {
        length += files.length;
        return readdir(`${path}/${directories[i++]}`);
      })
      .then(files => {
        length += files.length;
        expect(length).to.equal(data.data.length);
        done();
      });
  });
});
