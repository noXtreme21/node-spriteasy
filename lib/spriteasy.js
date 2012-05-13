var color  = require("ansi-color").set
  , fs     = require('fs')
  , less   = require('less')
  , path   = require('path')
  , Canvas = require('canvas')
  , Cli    = require('./cli')
  , Image  = Canvas.Image;

module.exports = (function() {
    function Sprite() {
        /**
         * Variables.
         */
        var _packages = new Array()
          , _files    = new Object()
          , _cli      = null;


        /**
         * init function.
         *
         * Handles the procedure of the sprite generator.
         *
         * @access public
         * @return void
         */
        this.init = function() {
            try {
                // Console output.
                console.log(color('=> [' + APPLICATION_NAME + ']', 'green+bold'));
                
                // Request comandline class.
                _cli = new Cli();
                
                // Check if arguments are valid.
                if ((_packages = _cli.validateArguments()) !== null) {
                    // Handle each package.
                    _handleEachPackage();
                    // Write stylesheet.
                    _writeStylesheet();
                    // Write image.
                    _writeImage();
                }
            } catch (exception) {
                console.error(' * ' + color('[ERROR] ', 'red+bold') + exception);
            }
        }


        /**
         * _handleEachPackage function.
         *
         * Handle each package which is defined via
         * the configuration file.
         *
         * @access private
         * @return void
         */
        var _handleEachPackage = function() {
            for (var i in _packages) {
                // Console output.
                console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'handle package: ' + (parseInt(i) + 1));
                
                // Handle each package.
                _handleEachImage(_packages[i]);
            }
        }


        /**
         * _handleEachImage function.
         * 
         * Handle each image element inside a package.
         *
         * @access private
         * @param  object package
         * @return void
         */
        var _handleEachImage = function(package) {
            for (var i in package.path) {
                try {
                    // Parse image.
                    _parseImage(package, i);
                    // Generate image stylesheet.
                    _generateImageStylesheet(package, i);
                } catch (exception) {
                    throw exception;
                }
            }
        }


        /**
         * _parseImage function.
         * 
         * Create an image and append them to the package object.
         * It also analyse width and height and the absolute width and height.
         *
         * @access private
         * @param  object package
         * @param  integer i
         * @return void
         */
        var _parseImage = function(package, i) {
            // Generate image object.
            var image            = new Image();
            // Define source of the image.
            image.src            = package.path[i];
            
            // Console output.
            console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'analysing image: ' + image.src);

            // Redefine package informations.
            package.width        = package.width || image.width;
            package.height       = package.height || image.height;
            package.totalWidth   = (package.totalWidth < package.width) ? package.width : package.totalWidth;
            package.totalHeight += package.height;

            // Push image date to package object.
            package.images.push({
                image: image
              , top:   package.totalHeight
            });
        }


        /**
         * _generateImageStylesheet function.
         *
         * Generate stylesheet information about the current
         * handled image. Stylesheet will written later.
         * 
         * @access private
         * @param  object package
         * @param  integer i
         * @return void
         */
        var _generateImageStylesheet = function(package, i) {
            // Console output.
            console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'generating stylesheet-entry: .' + package.class + '_' + i);
            
            // Push stylesheet information to package object.
            package.stylesheet.push('.', package.class, '_', i, ' {\n');
            package.stylesheet.push('\tbackground-image: url("', package.imageDestination, '");\n');
            package.stylesheet.push('\tbackground-repeat: no-repeat;\n');
            package.stylesheet.push('\tbackground-position: -0px -', package.images[i].top, 'px;\n');
            package.stylesheet.push('\twidth: ', package.width, 'px;\n');
            package.stylesheet.push('\theight: ', package.height, 'px;\n');
            package.stylesheet.push('}\n\n');
        }


        /**
         * _writeStylesheet function.
         *
         * Write stylesheet in one global stylesheet or if defined
         * for each image. If given first the less files will compiled.
         * If no less files are defined in the configuration file then
         * the _writeStylesheetPackages will called for writing the
         * stylesheet files for the sprite images.
         *
         * @access private
         * @return void
         */
        var _writeStylesheet = function() {
            var lessFiles = _cli.getLessFiles();

            if (lessFiles.length > 0) {
                for (var i in lessFiles) {
                    var lessFile = lessFiles[i];

                    // Console output.
                    console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'compiling less file: ' + lessFile);
                
                    var parser = new(less.Parser)({
                        paths: new Array(path.dirname(lessFile)), // Specify search paths for @import directives
                        filename: lessFile // Specify a filename, for better error messages
                    });

                    parser.parse(fs.readFileSync(lessFile, 'utf8'), function(err, tree) {
                        if (err) { return console.error(err) }
                        var file = _getFileStream(_cli.getStylesheetDestination());

                        file.write(tree.toCSS());

                        // Console output.
                        console.log(' * ' + color('[SUCCESS] ', 'green+bold') + 'less file compiled successfully');
                
                        if (parseInt(i) === (lessFiles.length - 1)) {
                            _writeStylesheetPackages();
                        }
                    });
                }
            } else {
                _writeStylesheetPackages();
            }
        }
        
        
        /**
         * _writeStylesheetPackages function.
         *
         * Write stylesheet files for each sprite image.
         * 
         * @access private
         * @return void
         */
        var _writeStylesheetPackages = function() {
            for (i in _packages) {
                // Console output.
                console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'generating sprite stylesheet: ' + _packages[i].stylesheetDestination);
                
                // Writing stylesheet information to file.
                var file = _getFileStream(_packages[i].stylesheetDestination);
                file.write(_packages[i].stylesheet.join(''));
                
                // Console output.
                console.log(' * ' + color('[SUCCESS] ', 'green+bold') + 'sprite stylesheet created successfully');
            }
        }


        /**
         * _getFileStream function.
         *
         * Get an existing file stream. If not already open it will
         * created and saved into _files object.
         *
         * @access private
         * @param  string identifier
         * @return void
         */
        var _getFileStream = function(identifier) {
            if (typeof _files[identifier] !== 'undefined') {
                // Getting an existing file stream.
                return _files[identifier];
            } else {
                // Creating a new file stream.
                return _files[identifier] = fs.createWriteStream(identifier);
            }
        }


        /**
         * _writeImage function.
         *
         * Generate and write each sprite image to filesystem.
         *
         * @access private
         * @return void
         */
        var _writeImage = function() {
            // Handle each package.
            for (var i in _packages) {
                // Console output.
                console.log(' * ' + color('[INFO] ', 'yellow+bold') + 'generating sprite image: ' + _packages[i].imageDestination);
                
                // Create new canvas elements and canvas context for each package. 
            	var canvas  = new Canvas(_packages[i].totalWidth, _packages[i].totalHeight)
                  , context = canvas.getContext('2d')
                  , top     = 0;

                // If mirror param is horizontal.
                if (_packages[i].mirror === 'horizontal') {
                    context.translate(_packages[i].totalWidth, 0);
                    context.scale(-1, 1);
                // If mirror param is vertical.
                } else if (_packages[i].mirror === 'vertical') {
                    context.translate(0, _packages[i].totalHeight);
                    context.scale(1, -1);
                    _packages[i].images.reverse();
                // If mirror param is horizontal-vertical.
                } else if (/(horizontal[- ]{0,}vertical|vertical[- ]{0,}horizontal)/.test(_packages[i].mirror) === true) {
                    context.translate(_packages[i].totalWidth, _packages[i].totalHeight);
                    context.scale(-1, -1);
                    _packages[i].images.reverse();
                }

                // Write each image to canvas context.
                for (var j in _packages[i].images) {
                    imageData = _packages[i].images[j].image;
                    context.drawImage(imageData, 0, 0, imageData.width, imageData.height, 0, top, _packages[i].width, _packages[i].height);
                    top += _packages[i].height;
                }

                // Writing each image to defined image path.
                (function() {
                    // Create file stream for writing image.
                    var imageFile = fs.createWriteStream(_packages[i].imageDestination);
                    // Create png image stream.
                	var stream = canvas.createPNGStream();

                    // Listen for data event.
                	stream.on('data', function (chunk) {
                		imageFile.write(chunk);
                	});

                    // Listen for end event.
                    stream.on('end', function (chunk) {
                        // Console output.
                        console.log(' * ' + color('[SUCCESS] ', 'green+bold') + 'sprite image created successfully');
                    });
                })();
            }
        }
    }


    return new Sprite;
})();
