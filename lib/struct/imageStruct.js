module.exports = (function() {
    ImageStruct.prototype = require(SPRITEASY_PATH_ABSTRACT + '/abstractStruct');


    /**
     * Configuration function.
     *
     * Provides a image structure and
     * all required methods.
     *
     * @access public
     * @return function
     */
    function ImageStruct(imageReader) {
        /**
         * Contains the image reader.
         */
        var _imageReader = imageReader || null;

        /**
         * Image object.
         */
        var _image       = null;

        /**
         * Width of image. Can contain scale information.
         */
        var _width       = null;

        /**
         * Height of image. Can contain scale information.
         */
        var _height      = null;

        /**
         * Current total width of image.
         */
        var _totalWidth  = null;

        /**
         * Current total height of image.
         */
        var _totalHeight = null;


        /**
         * getImage function.
         *
         * Get the image object.
         *
         * @access public
         * @return Object
         */
        this.getImage = function() {
            return _image || false;
        }


        /**
         * setImage function.
         *
         * Set image object.
         *
         * @access public
         * @param  object image
         * @return void
         */
        this.setImage = function(image) {
            if (typeof image === 'object') {
                _image = image;
            }
            
            return this;
        }


        /**
         * getWidth function.
         *
         * Get width of image. Can contain scale information.
         *
         * @access public
         * @return Integer
         */
        this.getWidth = function() {
            return _width || 0;
        }


        /**
         * setWidth function.
         *
         * Set width of image.
         *
         * @access public
         * @param  Integer width
         * @return void
         */
        this.setWidth = function(width) {
            _width = parseInt(width);
            return this;
        }


        /**
         * getHeight function.
         *
         * Get height of image. Can contain scale information.
         *
         * @access public
         * @return Integer
         */
        this.getHeight = function() {
            return _height || 0;
        }


        /**
         * setHeight function.
         *
         * Set height of image.
         *
         * @access public
         * @param  Integer height
         * @return void
         */
        this.setHeight = function(height) {
            _height = parseInt(height);
            return this;
        }


        /**
         * getTotalWidth function.
         *
         * Get total width of current image.
         *
         * @access public
         * @return Integer
         */
        this.getTotalWidth = function() {
            return _totalWidth || 0;
        }


        /**
         * setTotalWidth function.
         *
         * Set the current total width of image.
         *
         * @access public
         * @param mixed totalWidth
         * @return void
         */
        this.setTotalWidth = function(totalWidth) {
            _totalWidth = parseInt(totalWidth);
            return this;
        }


        /**
         * getTotalHeight function.
         *
         * Get the total height of image.
         *
         * @access public
         * @return Integer
         */
        this.getTotalHeight = function() {
            return _totalHeight || 0;
        }


        /**
         * setTotalHeight function.
         *
         * Set current total height of image.
         *
         * @access public
         * @param  Integer totalHeight
         * @return void
         */
        this.setTotalHeight = function(totalHeight) {
            _totalHeight = parseInt(totalHeight);
            return this;
        }
        
        
        /**
         * getLeft function.
         *
         * Get left position of image.
         *
         * @access public
         * @return Integer
         */
        this.getLeft = function() {
            return parseInt(_totalWidth - _width) || 0;
        }


        /**
         * getTop function.
         *
         * Get top position of image.
         *
         * @access public
         * @return Integer
         */
        this.getTop = function() {
            return parseInt(_totalHeight - _height) || 0;
            return this;
        }


        /**
         * _validateImageReader function.
         *
         * Validate properties from imageReader.
         *
         * @access private
         * @return void
         */
        var _validateImageReader = function() {
            if (_imageReader !== null && typeof _imageReader.load !== 'undefined') {
                var image = _imageReader.load();

                if (typeof image.image !== 'undefined') {
                    this.setImage(image.image);
                }

                if (typeof image.width !== 'undefined') {
                    this.setWidth(image.width);
                }

                if (typeof image.height !== 'undefined') {
                    this.setHeight(image.height);
                }

                if (typeof image.totalWidth !== 'undefined') {
                    this.setTotalWidth(image.totalWidth);
                }

                if (typeof image.totalHeight !== 'undefined') {
                    this.setTotalHeight(image.totalHeight);
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
            _validateImageReader.call(this);
        }).call(this);
    }


    /**
     * Return ImageStruct class.
     */
    return ImageStruct;
})();
