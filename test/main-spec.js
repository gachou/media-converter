/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
// /* global it */
// /* global xdescribe */
// /* global xit */

'use strict'

var path = require('path')
var fs = require('fs')
var qfs = require('q-io/fs')
var request = require('request')
var storage = require('./mock-storage.js')
var MediaConverter = require('../')

var tmp = path.resolve(__dirname, '..', 'test-output','main-spec')
var converter = new MediaConverter({
  host: '127.0.0.1',       // optional, defaults to any interface
  port: 0
})

describe('media-converter:', function () {
  before(() => {
    return qfs.removeTree(tmp)
      .catch(() => {})
      .then(() => qfs.makeTree(tmp))

  })
  before((done) => storage.start(function () {
    console.log('Mock server address', storage._socket.address())
    done();
  }))
  after(() => storage.stop())

  before(() => {
    return converter.start().then(() => {
      return console.log('Converter started on ', converter.address())
    })
  })
  after(() => converter.stop())

  it("should", function (done) {
    var converterPort = converter.address().port;
    var storageUrl = `http://localhost:${storage._socket.address().port}/autumn.jpg`;
    var converterUrl = `http://localhost:${converterPort}/thumbnail/200x200?source=${encodeURIComponent(storageUrl)}`;
    console.log("Call converter at ",converterUrl)
      request(converterUrl, function(err,res,body) {
        console.log(body);
        done()
      })
        //.pipe(fs.createWriteStream(path.join(tmp,'autumn-200x200.jpg')))
        //.on('finish',done)
  })
})
