// cache.js
const NodeCache = require("node-cache");
const stateCache = new NodeCache({ stdTTL: 300 }); // 5 minutos

module.exports = stateCache;
