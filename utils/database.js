const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  port: 3306,
  database: 'shopri',
  host: 'localhost',
  user: 'root',
  password: '',
  dateStrings: true
});

const dbQuery = util.promisify(conn.query).bind(conn);
module.exports = { dbQuery };