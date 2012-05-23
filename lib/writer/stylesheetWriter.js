var fs = require('fs');


module.exports = (function() {
    /**
     * Inherit from AbstractWriter.
     */
    StylesheetWriter.prototype = new SPRITEASY.AbstractWriter();
    
    
    function StylesheetWriter(configuration, packages) {
        this.configuration = configuration;
        this.packages      = packages;
        
        var _fileStreams   = new Object();
        

        /**
         * write function.
         *
         * Start a write procedure.
         * 
         * @access public
         * @return object
         */
        this.write = function() {
            this.handleEachPackage();
            return this;
        }
        
        
        /**
         * writeElement function.
         *
         * Write the stylesheet entry for the current image.
         * 
         * @access public
         * @param  object package
         * @param  object image
         * @return void
         */
        this.writeElement = function(package, image) {
            var stylesheet = new Array();
            
            stylesheet.push('.', package.getClass(), '_', image.getIterator(), ' {\n');
            stylesheet.push('\tbackground-image: url("', package.getImageDestination(), '");\n');
            stylesheet.push('\tbackground-repeat: no-repeat;\n');
            stylesheet.push('\tbackground-position: -0px -', image.getTop(), 'px;\n');
            stylesheet.push('\twidth: ', image.getWidth(), 'px;\n');
            stylesheet.push('\theight: ', image.getHeight(), 'px;\n');
            stylesheet.push('}\n\n');
            
            var file = _getFileStream(package.getStylesheetDestination());
            file.write(stylesheet.join(''));
        }


        /**
         * _getFileStream function.
         *
         * Get an existing file stream. If not already open it will
         * created and saved into _fileStreams object.
         *
         * @access private
         * @param  string identifier
         * @return object
         */
        var _getFileStream = function(identifier) {
            if (typeof _fileStreams[identifier] !== 'undefined') {
                // Getting an existing file stream.
                return _fileStreams[identifier];
            } else {
                // Creating a new file stream.
                return _fileStreams[identifier] = fs.createWriteStream(identifier);
            }
        }
    }
    
    
    /**
     * Return StylesheetWriter class.
     */
    return StylesheetWriter;
})();
