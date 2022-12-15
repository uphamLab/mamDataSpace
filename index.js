const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const handler = require('./handler')
const redis = require('./redis');
const port = 3000
const throttle_time = 60
const num_requests = 5
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/ping', (request, response) => {
  response.json({ info: 'pong' })
})

app.get('/pong', (request, response) => {
    response.json({ info: 'ping' })
  })

app.get('/find_starting_with', async (request, response) => {
const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  const requests = await redis.incr(ip);
  console.log(`Number of requests made so far `+ requests);
  if (requests === 1) {
    await redis.expire(ip, throttle_time);
  }
  if (requests > num_requests) {
    response.status(503)
      .json({
        response: 'Error',
        callsMade: requests,
        msg: 'Too many calls made'
      });
  } else
    handler.findData(request, response)
  })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})