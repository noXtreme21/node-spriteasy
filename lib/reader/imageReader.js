module.exports = (function() {
    function ImageReader(image) {
        var _image = image;
        
        
        this.load = function() {
            if (typeof _image === 'object') {
                return _image;
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
