const Query = require('./queries');
const { search } = require('./helpers');

const args = process.argv.slice(2);

const [ concepts_text ] = args;

const INDEX = 'news';
const TYPE = 'article';

const query = new Query(INDEX, TYPE);
query.addQuery();
query.withQueryMatch({ concepts_text });

search(query)
  .then(res => console.log('Complete'))
  .catch(err => console.log(`Error: ${err}`));

