const client = require('./connection');

exports.createIndex = indexName => {
  return new Promise((resolve, reject) => {
    client.indices.create({
      index: indexName,
    }, (err, resp, status) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Create: ${resp}`);
        resolve(resp);
      }
    });
  });
}

exports.deleteIndex = indexName => {
  return new Promise((resolve, reject) => {
    client.indices.delete({
      index: indexName,
    }, (err, resp, status) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Delete: ${resp}`);
        resolve(resp);
      }
    });
  });
}

exports.addDocument = (doc, index, type) => {
  return new Promise((resolve, reject) => {
    client.index({
      index,
      type,
      body: doc,
    }, (err, resp, status) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Add doc: ${resp}`);
        resolve(resp);
      }
    });
  });
}

exports.addBulkDocuments = (docs, index, type) => {
  const items = [];
  for (let i = 0; i < docs.length; i++) {
    items.push({ index: { _index: index, _type: type, _id: i } });
    items.push(docs[i]);
  }
  return new Promise((resolve, reject) => {
    client.bulk({
      maxRetries: 5,
      index,
      type,
      body: items,
    }, (err, resp, status) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Bulk success\nIndex:${index}\nType:${type}\n${JSON.stringify(resp, null, 1)}`);
        resolve(resp);
      }
    });
  });
}

exports.search = query => {
  return new Promise((resolve, reject) => {
    client.search(query, (err, resp, status) => {
      if (err) {
        reject(err);
      } else {
        console.log('--- Response ---');
        console.log(resp);
        console.log('--- Hits ---');
        resp.hits.hits.forEach(hit => console.log(hit));
        resolve(resp);
      }
    });
  });
}
