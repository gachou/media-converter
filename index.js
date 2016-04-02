/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var Q = require('q')
var request = require('request')

module.exports = MediaConverter
/**
 * A media-converter instance
 * @public
 * @class
 */
function MediaConverter (options) {
  var _this = this
  var server

  /**
   * Express middleware that perform the conversion
   * @param req
   * @param res
   * @param next
     */
  this.middleware = function () {
    return function middleware (req, res, next) {
      console.log('Receieved query', req.query)
      // For now (dummy implementation), just download the image from the url
      // and return it as-is
      request(req.query.source).pipe(res)
    }
  }

  /**
   * Start a converter
   */
  this.start = function start () {
    var express = require('express')
    var app = express()
    var defer = Q.defer()

    app.use(this.middleware())

    server = app.listen(options.port, options.host, function (err) {
      if (err) {
        return defer.reject(err)
      }
      return defer.resolve({
        address: _this.address()
      })
    })
    return defer.promise
  }

  this.address = function () {
    return server.address()
  }

  this.stop = function () {
    return Q(server.close())
  }
}
