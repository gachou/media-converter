# media-converter 

[![NPM version](https://badge.fury.io/js/media-converter.svg)](http://badge.fury.io/js/media-converter)
     [![Travis Build Status](https://travis-ci.org/warau-js/media-converter.svg?branch=master)](https://travis-ci.org/warau-js/media-converter)
   [![Coverage Status](https://img.shields.io/coveralls/warau-js/media-converter.svg)](https://coveralls.io/r/warau-js/media-converter)


> A Rest-based converter for images and videos

The converter should is part of [wara&middot;u](http://warau-js.github.io/) but 
also usable in other environments, see [this small design page](http://warau-js.github.io/media-converter)
for details

# TODO

[ ] Document interface
[ ] Implement the actual scaling and conversion
[ ] Add option to specify a white-list pattern for valid urls
[ ] Good error messages on invalid input data
[ ] Testcases for express server

# Installation

```
npm install media-converter
```

 
## Usage

The following example demonstrates how to use this module:

```js

```

This will generate the following output

```

```

##  API-reference

<a name="MediaConverter"></a>
### MediaConverter
**Kind**: global class  
**Access:** public  

* [MediaConverter](#MediaConverter)
  * [new MediaConverter()](#new_MediaConverter_new)
  * [.middleware(req, res, next)](#MediaConverter+middleware)
  * [.start()](#MediaConverter+start)

<a name="new_MediaConverter_new"></a>
#### new MediaConverter()
A media-converter instance

<a name="MediaConverter+middleware"></a>
#### mediaConverter.middleware(req, res, next)
Express middleware that perform the conversion

**Kind**: instance method of <code>[MediaConverter](#MediaConverter)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="MediaConverter+start"></a>
#### mediaConverter.start()
Start a converter

**Kind**: instance method of <code>[MediaConverter](#MediaConverter)</code>  



## License

`media-converter` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).