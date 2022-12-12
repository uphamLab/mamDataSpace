const  pg = require('pg')
var conString = "pg://doadmin:AVNS_kd6af68cOs7XfPxhFJJ@db-postgresql-nyc1-45961-do-user-12013676-0.b.db.ondigitalocean.com:25060/defaultdb";
var client = new pg.Client(conString);
client.connect();
// const client = new Client({
//   user: 'doadmin',
//   host: 'db-postgresql-nyc1-45961-do-user-12013676-0.b.db.ondigitalocean.com',
//   database: 'defaultdb',
//   password: 'AVNS_kd6af68cOs7XfPxhFJJ',
//   port: 25060,
// })
// client.connect()
const findData = (request, response) => {
  query = `SELECT * FROM species where  UPPER(sci_name) like UPPER('`+request+`%')ORDER BY id ASC`

  console.log(query)
  client.query(query, (error, results) => {
    if (error) {
      console.log(error)
      return
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  findData,
}
