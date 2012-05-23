var Canvas = require('canvas')
  , Image  = Canvas.Image;


module.exports = (function() {
    /**
     * Inherit from AbstractFileHandler.
     */
    ImageReader.prototype = new SPRITEASY.AbstractFileHandler();


    function ImageReader(image) {
        /**
         * Image object or path location.
         *
         * @access private
         * @var    object|string
         */
        var _image = image;


        /**
         * load function.
         *
         * Reads an image by location or if string is given a json
         * configuration file will read and after loading
         * the file will be parsed.
         *
         * @access public
         * @return object
         */
        this.load = function() {
            // If image object is given.
            if (typeof _image === 'object') {
                // Return image object.
                return _image;
            // If json configuration file exists.
            } else if (typeof _image === 'string' && this.isJsonPath(_image) === true) {
                // Read file and parse json.
                var image = this.readJsonFile(_image);

                // Set image src and load image.
                image.image = (function() {
                    var imageCache = new Image();
                    imageCache.src = image.image;
                    return imageCache;
                })();

                // Return image object.
                return image;
            } else {
                throw 'can not read image';
            }
        }
    }


    /**
     * Return ImageReader class.
     */
    return ImageReader;
})();
