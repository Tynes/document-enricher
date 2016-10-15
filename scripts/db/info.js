const client = require('./connection');

exports.health = () => {
  return new Promise((resolve, reject) =>
    client.cluster.health({},(err,resp,status) => {  
      if (err) {
        reject(err);
      } else {
        console.log(`-- Client Health -- ${JSON.stringify(resp, null, 1)}`);
        resolve(resp);
      }
    }
  ));
}

exports.indexCountByType = (index, type) => {
  return new Promise((resolve, reject) => {
    client.count({
      index,
      type,
    }, (err, resp, status) => {
      if (err) {
        reject(err)
      } else {
        console.log(`Index: ${index}\nType: ${type}\n${resp}`);
        resolve(resp);
      }
    });
  });
}




