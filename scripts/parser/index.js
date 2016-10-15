const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const readdir = Promise.promisify(fs.readdir);
const lstat = Promise.promisify(fs.lstat);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const { buildObject } = require('./helpers');

const PATH = `${__dirname}/../../data/raw/text_data`;
const OUTPUT_PATH = `${__dirname}/../../data/formatted`;

readdir(PATH, { encoding: 'buffer' })
  .then(files => {
    const stats = Promise.map(files, file => lstat(`${PATH}/${file}`));
    return Promise.all([files, stats])
  })
  .then(data => {
    const files = data[0].map(file => file.toString());
    const stats = data[1];
    // create tuples, [0] - directory name, [1] - stats object
    const relatedData = _.zip(files, stats);
    // filter for directories only
    return relatedData.filter(d => d[1].isDirectory());
  })
  .then(directories => {
    // get contents of the directories
    const fileNames = Promise
      .map(directories, d => readdir(`/${PATH}/${d[0]}`));
    // pass along the names, no longer need the stat objects
    const paths = directories.map(d => d[0]);
    return Promise.all([paths, fileNames])
  })
  .then(data => {
    const directories = data[0];
    const fileNames = data[1];
    // generate the paths of each file
    const paths = [];
    for (let i = 0; i < directories.length && fileNames.length; i++) {
      _.each(fileNames[i], fileName => paths.push(`${directories[i]}/${fileName}`));
    }
    return paths;
  })
  .then(bases => {
    // read the files
    const files = Promise.map(bases, base => readFile(`${PATH}/${base}`, 'utf8'))
    console.log('Reading text files: data/raw/text_data/*');
    return Promise.all([bases, files])
  })
  .then(data => {
    // Build objects with appropriate data
    const bases = data[0];
    const files = data[1];
    const objects = [];
    for (let i = 0; i < bases.length && files.length; i++) {
      objects.push(buildObject(bases[i], files[i]));
    }
    console.log('Building JSON');
    return objects;
  })
  .then(objects => {
    // write file
    const json = { data: objects };
    const path = `${OUTPUT_PATH}/pre_enriched.json`;
    console.log('Writing file');
    return writeFile(path, JSON.stringify(json))
  })
  .then(() => console.log('Complete build: data/formatted/pre_enriched.json'))
  .catch(err => console.log(err));
