const  {Client} = require('pg')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const client = new Client({
  user: 'doadmin',
  host: 'db-postgresql-nyc1-45961-do-user-12013676-0.b.db.ondigitalocean.com',
  database: 'defaultdb',
  password: 'AVNS_kd6af68cOs7XfPxhFJJ',
  port: 25060,
  ssl: true,
})
client.connect()
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     user: 'doadmin',
//     host: 'db-postgresql-nyc1-45961-do-user-12013676-0.b.db.ondigitalocean.com',
//     database: 'defaultdb',
//     password: 'AVNS_kd6af68cOs7XfPxhFJJ',
//     port: 25060,
//   }
// });

const findData = (request, response) => {
  
  query = `SELECT * FROM species where  UPPER(sci_name) like UPPER('`+request+`%')ORDER BY id ASC`

  console.log(query)
  client.query(query, (error, results) => {
    console.log('ERROR:'+ error)
    if(!error) {
      console.log(results.rows )
      response.status(200).json(results.rows)

      return results.rows    
    }

    
  })
}

module.exports = {
  findData,
}
