/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
var path = require('path')

var StaticServer = require('static-server');

var server = new StaticServer({
  rootPath: path.resolve(__dirname,'fixtures'),            // required, the root of the server file tree
  name: 'test-storage',   // optional, will set "X-Powered-by" HTTP header
  host: '127.0.0.1'       // optional, defaults to any interface
});

module.exports = server;
