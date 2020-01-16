'use strict'

require('dotenv').config()
const path = require("path")
const fs = require('fs')
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString

const connectionString = process.env.DEVICE_CONNECTION_STRING
const filename = './image/1.jpg'

const client = clientFromConnectionString(connectionString)
console.log('Client connected')

fs.stat(filename, (err, stats) => {
  const rr = fs.createReadStream(filename)

  client.uploadToBlob(path.basename(filename), rr, stats.size, err => {
    if (err) {
      console.error(`Error uploading file: ${err.toString()}`)
    } else {
      console.log('File uploaded')
    }
  })

})

