
const { request } = require('express')
const db = require('./data')

const findData = (request, response) => {
// response.json({ status:500, info: 'Internal error. If you are the service owner please check the logs' })
// return
  let params = validateParamsFindStartsWithData(request)
  try {
    db.findData(params)
  } catch (error) {
    response.json({ status:500, info: 'Internal error. If you are the service owner please check the logs' })
  }
}
function validateParamsFindStartsWithData(request) {

    if(!request.query || !request.query.starts_with)
        return false;
    return request.query.starts_with
}

module.exports = {
  findData
}
