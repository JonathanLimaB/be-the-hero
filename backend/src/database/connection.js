const knex = require('knex');
const configuration = require('../../knexfile') // o uso do .. é para voltar a pasta

const connection = knex(configuration.development);

module.exports = connection;