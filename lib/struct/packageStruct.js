var Canvas = require('canvas')
  , Image  = Canvas.Image;

module.exports = (function() {
    PackageStruct.prototype = require(SPRITEASY_PATH_ABSTRACT + '/abstractStruct');


    /**
     * Package function.
     *
     * Provides a package structure and
     * all required methods.
     *
     * @access public
     * @return function
     */
    function PackageStruct(packageReader, configuration) {
        /**
         * Contains the packageReader.
         */
        var _packageReader         = packageReader;

        /**
         * Configuration object.
         */
        var _configuration         = configuration;
        
        /**
         * Contains a collection of images.
         */
        var _imageCollection       = new SPRITEASY.Collection();

        /**
         * An identifier for stylesheet class name.
         */
        var _class                 = null;

        /**
         * Image destination for sprite image.
         */
        var _imageDestination      = _configuration.getImageDestination() || null;

        /**
         * Stylesheet destination for sprite image.
         */
        var _stylesheetDestination = _configuration.getStylesheetDestination() || null;

        /**
         * Image width.
         */
        var _width                 = 0;

        /**
         * Image height.
         */
        var _height                = 0;

        /**
         * Total width of all images.
         */
        var _totalWidth            = 0;

        /**
         * Total height of all images.
         */
        var _totalHeight           = 0;

        /**
         * A scale resolution for sprite image.
         */
        var _scale                 = null;

        /**
         * A mirror definition for sprite image.
         */
        var _mirror                = null;


        /**
         * getClass function.
         *
         * Return the class name.
         *
         * @access public
         * @return string
         */
        this.getClass = function() {
            return _class;
        }


        /**
         * setClass function.
         *
         * Set a class identifier to package object.
         *
         * @access public
         * @param  string class
         * @return void
         */
        this.setClass = function(classname) {
            _class = String(classname);
        }


        /**
         * getImageDestination function.
         *
         * Return the image destination.
         *
         * @access public
         * @return string
         */
        this.getImageDestination = function() {
            return _imageDestination;
        }


        /**
         * setImageDestination function.
         *
         * Set an image destination to package object.
         *
         * @access public
         * @param  string imageDestination
         * @return void
         */
        this.setImageDestination = function(imageDestination) {
            _imageDestination = String(imageDestination);
        }


        /**
         * getStylesheetDestination function.
         *
         * Return the stylesheet destination.
         *
         * @access public
         * @return string
         */
        this.getStylesheetDestination = function() {
            return _stylesheetDestination;
        }


        /**
         * setStylesheetDestination function.
         *
         * Set a stylesheet destination to package object.
         *
         * @access public
         * @param  string stylesheetDestination
         * @return void
         */
        this.setStylesheetDestination = function(stylesheetDestination) {
            _stylesheetDestination = String(stylesheetDestination);
        }


        /**
         * getWidth function.
         *
         * Return width of image.
         *
         * @access public
         * @return integer
         */
        this.getWidth = function() {
            var pattern = new RegExp('([0-9]{1,})(px){0,1}[\tx\* ]{1,}([0-9]{1,})(px){0,1}')
              , width = _width || 0;

            if (_scale !== null && (matches = _scale.match(pattern)) !== null) {
                width = parseInt(matches[1]);
            }

            return width;
        }


        /**
         * getHeight function.
         *
         * Return height of image.
         *
         * @access public
         * @return integer
         */
        this.getHeight = function() {
            var pattern = new RegExp('([0-9]{1,})(px){0,1}[\tx\* ]{1,}([0-9]{1,})(px){0,1}')
              , height = _height || 0;

            if (_scale !== null && (matches = _scale.match(pattern)) !== null) {
                height = parseInt(matches[3]);
            }

            return height;
        }


        /**
         * getTotalWidth function.
         *
         * Return the current total width of image.
         *
         * @access public
         * @return integer
         */
        this.getTotalWidth = function() {
            return _totalWidth || 0;
        }


        /**
         * getTotalHeight function.
         *
         * Return the current total height of image.
         *
         * @access public
         * @return integer
         */
        this.getTotalHeight = function() {
            return _totalHeight || 0;
        }


        /**
         * setScale function.
         *
         * Add a scale resolution to package object.
         *
         * @access public
         * @param  string scale
         * @return void
         */
        this.setScale = function(scale) {
            _scale = String(scale);
        }


        /**
         * getMirror function.
         *
         * Get mirror definition of image.
         *
         * @access public
         * @return string
         */
        this.getMirror = function() {
            return _mirror;
        }


        /**
         * setMirror function.
         *
         * Add a mirror definition to package object.
         *
         * @access public
         * @param  string mirror
         * @return void
         */
        this.setMirror = function(mirror) {
            _mirror = String(mirror);
        }


        /**
         * getImages function.
         *
         * Get all images for sprite generation.
         *
         * @access public
         * @return array
         */
        this.getImages = function() {
            return _imageCollection;
        }


        /**
         * addImage function.
         *
         * Add an image file to the path variable inside
         * the package object.
         *
         * @access public
         * @param  string path
         * @return void
         */
        this.addImage = function(imagePath) {
            var image = new Image();
            image.src = imagePath;

            _width        = this.getWidth() || image.width;
            _height       = this.getHeight() || image.height;
            _totalWidth   = (_totalWidth < _width) ? _width : _totalWidth;
            _totalHeight += _height;

            _imageCollection.append(
                new SPRITEASY.ImageStruct(
                    new SPRITEASY.ImageReader({
                        image: image
                      , width: _width
                      , height: _height
                      , totalWidth: _totalWidth
                      , totalHeight: _totalHeight
                    })
                )
            );
        }


        /**
         * _validatePackageReader function.
         *
         * Validate properties from packageReader.
         *
         * @access public
         * @return void
         */
        var _validatePackageReader = function() {
            if (_packageReader !== null && typeof _packageReader.load !== 'undefined') {
                var package = _packageReader.load();

                if (typeof package.class !== 'undefined') {
                    this.setClass(package.class);
                }

                if (typeof package.imageDestination !== 'undefined') {
                    this.setImageDestination(package.imageDestination);
                }

                if (typeof package.stylesheetDestination !== 'undefined') {
                    this.setStylesheetDestination(package.stylesheetDestination);
                }

                if (typeof package.scale !== 'undefined') {
                    this.setScale(package.scale);
                }

                if (typeof package.mirror !== 'undefined') {
                    this.setMirror(package.mirror);
                }

                if (typeof package.path !== 'undefined') {
                    var images = this.analyseImagePath(package.path);
                    
                    if (/(vertical)/.test(this.getMirror()) === true) {
                        images.reverse();
                    }
                    
                    for (var i in images) {
                        this.addImage(images[i]);
                    }
                }
            }
        }


        /**
         * __construct function.
         *
         * Constructor of this class handles the
         * main procedure which is required.
         *
         * @access private
         * @return void
         */
        var __construct = (function() {
            _validatePackageReader.call(this);
        }).call(this);
    }


    /**
     * Return PackageStruct class.
     */
    return PackageStruct;
})();