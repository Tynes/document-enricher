require('dotenv').config();
// add environmental variables to process.env

const BLUEMIX_API_KEY = process.env.BLUEMIX_API_KEY;

// initialize the npm AlchemyAPI client
const AlchemyAPI = require('alchemy-api');
const alchemy = new AlchemyAPI(BLUEMIX_API_KEY);

module.exports = alchemy;
