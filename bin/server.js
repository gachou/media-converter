#!/usr/bin/env node
/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var express = require('express')
var convert = require('../')
var bodyParser = require('body-parser')

var argv = require('yargs').argv

console.log(argv)
if (!argv.bind) {
  console.log(`Usage ${process.argv[1]} --bind=<bindhost-port>`)
  process.exit(1)
}

var app = express()

app.use(bodyParser.json())
app.get('/convert', function (req, res) {
  res.setHeader('Content-type', req.query.targetType)
  convert(req.query).pipe(res)
})

var hostPort = String(argv.bind).split(':')
var host = hostPort[0]
var port = hostPort[1]
if (!port) {
  // Bind to 0.0.0.0 if the "bind" parameter contains not colon
  port = hostPort[0]
  host = '0.0.0.0'
}

app.listen(port, host, function (err) {
  if (err) {
    throw err
  }
})
