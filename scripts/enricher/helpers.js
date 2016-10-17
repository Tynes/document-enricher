const alchemy = require('./connection');

// currently hard-coded with a few features that look interesting
// async enrich function, returns a promise
exports.enrich = text => {
  const features = ['doc-sentiment', 'concept', 'entity', 'doc-emotion'];
  return new Promise((resolve, reject) => {
    alchemy.combined(text, features, {}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/*
Possible Features:
page-image, image-kw, feed 
entity, keyword, title 
author, taxonomy, concept 
relation, pub-date
doc-sentiment, doc-emotion

Can build a function that accepts an array of features or
use a hash so that a simple string can be passed in
and have constant time lookup to commonly combined features
*/

// simplfiy the nested data returned from the AlchemyAPI
// this makes using elasticsearch easier
exports.simplify = data => {
  data.concepts_text = data.concepts.map(el => el.text);
  data.entities_text = data.entities.map(el => el.text);
  data.sentiment_type = data.docSentiment.type;
  return data;
};
