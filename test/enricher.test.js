const expect = require('chai').expect;

// NOTE: To save API calls, please generate the enriched_sample.json file before the tests in this file will pass
// To generate the file, run the command $ npm run build:enriched-dev
let data;

describe('The Enricher', function() {
  before(function(done) {
    console.log('To save API Calls, make sure to run the command: $ npm run build:enriched-dev or these tests will never pass');
    data = require('../data/formatted/enriched_sample.json');
    done();
  });
  it('Should have generated the file data/formatted/enriched_sample.json', function() {
    expect(data).to.exist;
  });
  it('Should have annotations from AlchemyAPI', function() {
    const datum = data.data[0];
    expect(datum).to.be.an('object');
    expect(datum).to.have.property('docEmotions')
      .that.is.an('object');
    expect(datum).to.have.property('concepts_text')
      .that.is.an('array');
    expect(datum).to.have.property('entities_text')
      .that.is.an('array');
    expect(datum).to.have.property('sentiment_type')
      .that.is.a('string');
  });
});
