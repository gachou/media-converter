/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe it before after*/

'use strict'

var path = require('path')
var fs = require('fs')
var qfs = require('q-io/fs')
var request = require('request')
var storage = require('./mock-storage.js')
var convert = require('../')
//var chai = require('chai')
//var expect = chai.expect

var tmp = path.resolve(__dirname, '..', 'test-output', 'main-spec')

describe('media-converter:', function () {
  before(() => {
    return qfs.removeTree(tmp)
      .catch(() => {
      })
      .then(() => qfs.makeTree(tmp))
  })
  before((done) => storage.start(function () {
    console.log('Mock server address', storage._socket.address())
    done()
  }))
  after(() => storage.stop())

  it('should convert and resize to jpg', function (done) {
    var storageUrl = `http://localhost:${storage._socket.address().port}/autumn.jpg`
    convert({
      url: storageUrl,
      thumbnail: true,
      targetType: 'image/jpeg',
      autoOrient: true,
      size: '100x100'
    })
      .on('error', (e) => console.log("Error while converting in test",e))
      .pipe(fs.createWriteStream(path.join(tmp, 'autumn-100x100.jpg')))
      .on('finish', done)
  })

  it('should convert to png', function (done) {
    var storageUrl = `http://localhost:${storage._socket.address().port}/autumn.jpg`
    convert({
      url: storageUrl,
      thumbnail: true,
      targetType: 'image/png',
      autoOrient: true,
      size: '100x100'
    })
      .on('error', (e) => console.log("Error while converting in test",e))
      .pipe(fs.createWriteStream(path.join(tmp, 'autumn-100x100.png')))
      .on('finish', done)
  })

  it('should convert to gif', function (done) {
    var storageUrl = `http://localhost:${storage._socket.address().port}/autumn.jpg`
    convert({
      url: storageUrl,
      thumbnail: true,
      targetType: 'image/gif',
      autoOrient: true,
      size: '100x100'
    })
      .on('error', (e) => { throw e })
      .pipe(fs.createWriteStream(path.join(tmp, 'autumn-100x100.gif')))
      .on('error', (e) => { throw e })
      .on('finish', done)
  })
})
