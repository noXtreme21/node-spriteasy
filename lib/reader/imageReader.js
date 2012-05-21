var fs     = require('fs')
  , path   = require('path')
  , Canvas = require('canvas')
  , Image  = Canvas.Image;

module.exports = (function() {
    function ImageReader(image) {
        var _image = image;
        
        
        this.load = function() {
            if (typeof _image === 'object') {
                return _image;
            } else if (typeof _image === 'string' && path.existsSync(_image) === true) {
               var type = fs.statSync(_image);
                if (type.isFile()) {
                    if (path.extname(_image) === '.json') {
                        var file = fs.readFileSync(_image, 'utf8');
                        var image = JSON.parse(file);
                        
                        image.image = (function() {
                            var imageCache = new Image();
                            imageCache.src = image.image;
                            return imageCache;
                        })();
                        
                        return image;
                    }
                } else {
                    throw 'directory given but configuration file is needed';
                }
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
