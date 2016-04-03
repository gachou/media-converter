/*!
 * media-converter <https://github.com/warau-js/media-converter>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var Q = require('q')
var request = require('request')
var im = require('imagemagick-stream')
var formats = require('./lib/im-formats.js')


module.exports = convert;

/**
 * Conversion method, accessible via javascript.
 * @param {object} options
 * @param {string} options.size the target size specification (i.e. 200x200)
 * @param {boolean} options.thumbnail whether the target should be a thumbnail (see http://www.imagemagick.org/Usage/thumbnails/)
 * @param {string} options.targetType the target mime-type. Default: image/jpeg
 * @param {boolean=} options.autoOrient rotate images based on EXIF-rotation tags. Default: true
 * @param {string} options.url the URL of the source image
 * @returns {stream.Readable} a stream that converts the image data to the new format
 */
function convert(options) {
  console.log("Convert Options",options)
  var magick = im().autoOrient(options.autoOrient)
  if (options.thumbnail) {
    magick = magick.thumbnail(options.size)
  } else {
    magick = magick.resize(options.size)
  }
  magick = magick.outputFormat(formats[options.targetType])
  console.log("ImageMagick args",magick.args())
  return request(options.url).pipe(magick);
}

