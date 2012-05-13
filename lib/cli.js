var fs       = require('fs')
  , color    = require("ansi-color").set
  , optimist = require('optimist')
  , path     = require('path');

module.exports = (function() {
    // Define optimist settings.
    var _arguments= optimist.usage(
        color('   This tool reads multiple images via configuration file or commandline arguments\n', 'bold')
      + color('   and writes sprite images and stylesheet files to simplify using that sprite in\n', 'bold')
      + color('   a browser. This tool also provides a posibility to compile less files and merge\n', 'bold')
      + color('   all generated stylesheet information into one big stylesheet.\n\n', 'bold')
      + color(' * Version: ' + APPLICATION_VERSION + '\n', 'red+bold')
      + color(' * Usage: ' + APPLICATION_NAME + ' [options]', 'green+bold')).options({
		help: {
			alias: 'h'
          , description: 'show help'
		}
      , config: {
			alias: 'c'
          , description: 'configuration file'
		}
      , directory: {
			alias: 'd'
          , description: 'image directory'
		}
      , 'class-identifier': {
            alias: 'class'
          , description: 'alternative class name for stylesheet generation'
		}
      , 'image-destination': {
			alias: 'image'
          , description: 'sprite image destination'
		}
      , 'stylesheet-destination': {
			alias: 'style'
          , description: 'sprite stylesheet destination'
		}
      , 'mirror-type': {
			alias: 'mirror'
          , description: 'mirror type (horizontal, vertical, horizontal-vertical)'
		}
      , 'scale-x': {
			alias: 'x'
          , description: 'scale image to a new defined width'
		}
      , 'scale-y': {
			alias: 'y'
          , description: 'scale image to a new defined height'
		}
      , less: {
			alias: 'l'
          , description: 'path of less file which should be compiled'
		}
	}).argv;


    function Cli() {
        /**
         * Variables.
         */
        var _configuration = null
          , _packages      = null;
        
        
        /**
         * _unkownArgument function.
         * 
         * Display that arguments not know or invalid.
         *
         * @access private
         * @return void
         */
        var _unkownArgument = function() {
            if (_arguments._.length === 0) {
                _help();
            } else {
                throw 'Unknown command: \'' + _arguments._ + '\'. Type sprite --help for usage.';
            }
        }


        /**
         * _help function.
         *
         * Show help instructions via optimist.
         * 
         * @access private
         * @return void
         */
        var _help = function () {
        	optimist.showHelp(console.log);
        }


        /**
         * validateArguments function.
         * 
         * This function will validate the commandline arguments.
         *
         * @access public
         * @return object
         */
        this.validateArguments = function() {
            if ((_arguments._ && _arguments._.length > 0
             || (typeof _arguments.config === 'undefined') && typeof _arguments.directory === 'undefined')) {
                _unkownArgument();
            }
            
            if (_arguments.config) {
                _readConfigurationFile();
            }
            
            if (_arguments.directory) {
                _readDirectory();
            }
            
            return _packages;
        }
        
        
        /**
         * getLessFiles function.
         *
         * Get a list of less files which should compiled.
         * 
         * @access public
         * @return array
         */
        this.getLessFiles = function() {
            return _configuration.compileLessFiles;
        }
        
        
        /**
         * getStylesheetDestination function.
         * 
         * Returns the default stylesheet destination file.
         *
         * @access public
         * @return string
         */
        this.getStylesheetDestination = function() {
            return _configuration.stylesheetDestination;
        }


        /**
         * _readArguments function.
         *
         * Read the inserted user arguments from shell.
         * Check if configuration file is given or an image
         * directory.
         *
         * @access private
         * @return void
         */
        var _readConfigurationFile = function() {
            if (path.existsSync(_arguments.config) === true) {
                var type = fs.statSync(_arguments.config);
                if (type.isFile()) {
                    if (path.extname(_arguments.config) === '.json') {
                        var file = fs.readFileSync(_arguments.config, 'utf8');
                        var configuration = JSON.parse(file);
                        _parseConfiguration(configuration);
                    }
                } else {
                    throw 'directory given but configuration file is needed';
                }
            } else {
                throw 'configuration file \'' + _arguments.config + '\' does not exist';
            }
        }
        
        
        /**
         * _readDirectory function.
         * 
         * Read all images inside a directory and build
         * an image package which is required for the proccess.
         *
         * @access private
         * @return void
         */
        var _readDirectory = function() {
            var type                             = fs.statSync(_arguments.directory);
            _configuration                       = new Object();
            _configuration.compileLessFiles      = _analysePath(_arguments.less);
            _configuration.stylesheetDestination = _arguments['stylesheet-destination'] || _getConfiguredStylesheetDestination(null);

            if (type.isDirectory()) {
                _packages = new Array({
                    class:                 _arguments['class-identifier'] || 'sprite'
                  , imageDestination:      _arguments['image-destination'] || _getConfiguredImageDestination(null)
                  , stylesheetDestination: _configuration.stylesheetDestination
                  , scale:                 null
                  , width:                 _arguments.x || null
                  , height:                _arguments.y || null
                  , totalWidth:            0
                  , totalHeight:           0
                  , mirror:                _arguments['mirror-type'] || null
                  , path:                  _analysePath(_arguments.directory)
                  , images:                new Array()
                  , stylesheet:            new Array()
                });
            } else {
                throw 'no directory given';
            }    
        }
 
 
        /**
         * _parseConfiguration function.
         * 
         * Read a configuration file and validate all
         * params inside the configuration object.
         *
         * @access private
         * @param  object configuration
         * @return void
         */
        var _parseConfiguration = function(configuration) {
            _configuration = configuration;
            _packages      = _configuration.packages;
            
            _configuration.compileLessFiles = _analysePath(_configuration.compileLessFiles);
            
            for (var package in _packages) {
                try {
                    var package    = _packages[package];
                    
                    if (typeof package.class === 'undefined') {
                        throw 'no class name defined';
                    }
                    
                    if (typeof package.path === 'undefined') {
                        throw 'no path is defined';
                    }
                    
                    package.path                  = _analysePath(package.path);
                    package.width                 = _getConfiguredWidth(package);
                    package.height                = _getConfiguredHeight(package);
                    package.totalWidth            = 0;
                    package.totalHeight           = 0;
                    package.imageDestination      = _getConfiguredImageDestination(package);
                    package.stylesheetDestination = _getConfiguredStylesheetDestination(package);
                    package.images                = new Array();
                    package.stylesheet            = new Array();
                } catch (exception) {
                    console.error(' * ' + color('[ERROR] ', 'red+bold') + exception);
                }
            }
        }
        

        /**
         * _analysePath function.
         * 
         * Analyse the image path of a package.
         * If directories are defined this function will
         * automatically replace with the path of each image
         * inside a directory.
         *
         * @access private
         * @param  mixed imagePath
         * @return array
         */
        var _analysePath = function(imagePath) {
            var images = new Array();
            if (typeof imagePath === 'string') {
                var type = fs.statSync(imagePath);
                if (type.isDirectory()) {
                    var files = fs.readdirSync(imagePath);;
                    for (var i in files) {
                        images.push(path.join(imagePath, files[i]));
                    }

                    images.sort();
                } else if (type.isFile()) {
                    images.push(imagePath);
                }
            } else if (typeof imagePath === 'object') {
                for (var i in imagePath) {
                    var type = fs.statSync(imagePath[i]);
                    if (type.isDirectory()) {
                        var analysedImages = _analysePath(imagePath[i]);
                        for (var j in analysedImages) {
                            images.push(analysedImages[j]);
                        }
                    } else if (type.isFile()) {
                        images.push(imagePath[i]);
                    }
                }
            }

            return images;
        }
        



        /**
         * _getConfiguredWidth function.
         *
         * Get the configured width of an image. This function
         * is required for scaling images to an new size.
         *
         * @access private
         * @param  object package
         * @return integer|null
         */
        var _getConfiguredWidth = function(package) {
            var pattern = new RegExp('([0-9]{1,})(px){0,1}[x\* ]{1,}([0-9]{1,})(px){0,1}');
            var width = null;
            
            if (package.scale !== null) {
                if ((matches = package.scale.match(pattern)) !== null) {
                    width = parseInt(matches[1]);
                }
            }

            return width;
        }


        /**
         * _getConfiguredHeight function.
         *
         * Get the configured height of an image. This function
         * is required for scaling images to an new size.
         *
         * @access private
         * @param  object package
         * @return integer|null
         */
        var _getConfiguredHeight = function(package) {
            var pattern = new RegExp('([0-9]{1,})(px){0,1}[x\* ]{1,}([0-9]{1,})(px){0,1}');
            var height = null;

            if (package.scale !== null) {
                if ((matches = package.scale.match(pattern)) !== null) {
                    height = parseInt(matches[3]);
                }
            }

            return height;
        }
        
        
        /**
         * _getConfiguredImageDestination function.
         * 
         * Getting if defined the image destination path or
         * an automatic generated image path.
         *
         * @access private
         * @param  object package
         * @return string
         */
        var _getConfiguredImageDestination = function(package) {
            if (package === null) {
                return 'image_' + _getUniqueHash() + '.png';
            } else if (/(null|undefined)/.test(typeof package.imageDestination) || /(null|false)/.test(package.imageDestination)) {
                return [path.normalize(_configuration.imageDestination), '/image_' + _getUniqueHash() + '.png'].join('');
            } else {
                return path.normalize(package.imageDestination);
            }
        }
        
        
        /**
         * _getConfiguredStylesheetDestination function.
         *
         * Getting if defined the stylesheet destination path or
         * an automatic generated stylesheet path.
         * 
         * @access private
         * @param  object package
         * @return string
         */
        var _getConfiguredStylesheetDestination = function(package) {
            if (package === null) {
                return 'image_' + _getUniqueHash() + '.css';
            } else if (/(null|undefined)/.test(typeof package.stylesheetDestination) || /(null|false)/.test(package.stylesheetDestination)) {
                return path.normalize(_configuration.stylesheetDestination) || './image_' + _getUniqueHash() + '.css';
            } else {
                return path.normalize(package.stylesheetDestination);
            }
        }
        
        
        /**
         * _getUniqueHash function.
         * 
         * Get an unique identifier for creating filenames when
         * no destination configuration is defined.
         *
         * @access private
         * @return string
         */
        var _getUniqueHash = function() {
            return Math.round(Math.random() * 9999999 + new Date().getTime());
        }
    }


    return Cli;
})();
