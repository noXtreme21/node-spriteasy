var Canvas = require('canvas')
  , Image  = Canvas.images
  , fs = require('fs');


module.exports = (function() {
    /**
     * Inherit from AbstractWriter.
     */
    ImageWriter.prototype = new SPRITEASY.AbstractWriter();
        
        
    function ImageWriter(configuration, packages) {
        this.configuration = configuration;
        this.packages      = packages;

        var _canvas        = new Object
          , _context       = new Object;
        
        this.write = function() {
            this.handleEachPackage();
            return this;
        }
        
        
        this.writeElement = function(package, image) {
            var canvas = _getCanvas(package)
              , context = _getContext(package);

            context.drawImage(
                image.getImage(),
                0,
                0, 
                image.getImage().width,
                image.getImage().height,
                0,
                image.getTop(),
                image.getWidth(),
                image.getHeight()
            );

            if (image.hasNext() === false) {
               (function() {
                    // Create file stream for writing image.
                    var imageFile = fs.createWriteStream(package.getImageDestination());
                    
                    // Create png image stream.
                	var stream = canvas.createPNGStream();
    
                    // Listen for data event.
                	stream.on('data', function (chunk) {
                		imageFile.write(chunk);
                	});
                })();
            }
        }
        
        
        var _getCanvas = function(package) {
            var identifier = package.getImageDestination();
            
            if (typeof _canvas[identifier] !== 'undefined') {
                // Getting an existing canvas object.
                return _canvas[identifier];
            } else {
                // Creating a new canvas object.
                return _canvas[identifier] = new Canvas(
                    package.getTotalWidth()
                  , package.getTotalHeight()
                );
            }
        }
        
        
        var _getContext = function(package) {
            var identifier = package.getImageDestination();
            
            if (typeof _context[identifier] !== 'undefined') {
                // Getting an existing context object.
                return _context[identifier];
            } else {
                // Creating a new context object.
                _context[identifier] = _getCanvas(package).getContext('2d');
                _mirrorImage(package, _context[identifier]);
                return _context[identifier];
            }
        }
        
        
        var _mirrorImage = function(package, context) {
            // If mirror param is horizontal.
            if (package.getMirror() === 'horizontal') {
                context.translate(package.getTotalWidth(), 0);
                context.scale(-1, 1);
            // If mirror param is vertical.
            } else if (package.getMirror() === 'vertical') {
                context.translate(0, package.getTotalHeight());
                context.scale(1, -1);
            // If mirror param is horizontal-vertical.
            } else if (/(horizontal[- ]{0,}vertical|vertical[- ]{0,}horizontal)/.test(package.getMirror()) === true) {
                context.translate(package.getTotalWidth(), package.getTotalHeight());
                context.scale(-1, -1);
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
            
        }).call(this);
    }
    
    
    /**
     * Return ImageWriter class.
     */
    return ImageWriter;
})();
