/**
 * Created by n0216698 on 2/2/2017.
 */
const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    max: 10,
    idleTimeoutMillis: 1000,
    ssl: true
};

const pool = new Pool(config);

module.exports = pool;