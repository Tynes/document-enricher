const Query = require('./queries');
const { search } = require('./helpers');

const args = process.argv.slice(2);

const [ entities_type ] = args;

const INDEX = 'news';
const TYPE = 'article';

const query = new Query(INDEX, TYPE);
query.addQuery();
query.withQueryMatch({ entities_type });

search(query)
  .then(res => console.log('Complete'))
  .catch(err => console.log(`Error: ${err}`));

