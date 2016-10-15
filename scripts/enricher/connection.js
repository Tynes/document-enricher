require('dotenv').config();

const Promise = require('bluebird');
const BLUEMIX_API_KEY = process.env.BLUEMIX_API_KEY;

const AlchemyAPI = require('alchemy-api');
const alchemy = new AlchemyAPI(BLUEMIX_API_KEY);

module.exports = alchemy;
