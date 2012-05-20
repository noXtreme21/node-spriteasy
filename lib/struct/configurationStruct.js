module.exports = (function() {
    ConfigurationStruct.prototype = require(SPRITEASY_PATH_ABSTRACT + '/abstractStruct');


    /**
     * Configuration function.
     *
     * Provides a configuration structure and
     * all required methods.
     *
     * @access public
     * @return function
     */
    function ConfigurationStruct(configurationReader) {
        /**
         * Contains the configuration reader.
         */
        var _configurationReader   = configurationReader || null;

        /**
         * Contains a collection of packages.
         */
        var _packageCollection     = new SPRITEASY.Collection();

        /**
         * List of less file which should be compiled.
         */
        var _lessFiles             = new SPRITEASY.Collection();

        /**
         * Default image destination for sprite images.
         */
        var _imageDestination      = null;

        /**
         * Default stylesheet destination for sprite images.
         */
        var _stylesheetDestination = null;


        /**
         * getPackages function.
         *
         * Get all image packages.
         *
         * @access public
         * @return array
         */
        this.getPackages = function() {
            return _packageCollection || false;
        }


        /**
         * addPackage function.
         *
         * Add a image package to configuration object.
         *
         * @access public
         * @param  array package
         * @return void
         */
        this.addPackage = function(package) {
            _packageCollection.append(package);
            return this;
        }


        /**
         * getLessFiles function.
         *
         * Return all less file which should be compiled.
         *
         * @access public
         * @return array
         */
        this.getLessFiles = function() {
            return _lessFiles || false;
        }


        /**
         * addLessFile function.
         *
         * Add a less file which should be compiled to
         * the configuration object.
         *
         * @access public
         * @param  string lessFile
         * @return void
         */
        this.addLessFile = function(lessFile) {
            _lessFiles.append(String(lessFile));
            return this;
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
            return _imageDestination || false;
        }


        /**
         * setImageDestination function.
         *
         * Set image destination to configuration object.
         *
         * @access public
         * @param  string imageDestination
         * @return void
         */
        this.setImageDestination = function(imageDestination) {
            _imageDestination = String(imageDestination);
            return this;
        }


        /**
         * getImageDestination function.
         *
         * Return the stylesheet destination.
         *
         * @access public
         * @return string
         */
        this.getStylesheetDestination = function() {
            return _stylesheetDestination || false;
        }


        /**
         * setStylesheetDestination function.
         *
         * Set stylesheet destination to configuration object.
         *
         * @access public
         * @param  string stylesheetDestination
         * @return void
         */
        this.setStylesheetDestination = function(stylesheetDestination) {
            _stylesheetDestination = String(stylesheetDestination);
            return this;
        }


        /**
         * _validateConfigurationReader function.
         *
         * Validate properties from configurationReader.
         *
         * @access private
         * @return void
         */
        var _validateConfigurationReader = function() {
            if (_configurationReader !== null && typeof _configurationReader.load !== 'undefined') {
                var configuration = _configurationReader.load();

                if (typeof configuration.packages !== 'undefined') {
                    var packages; for (var i in (packages = configuration.packages)) {
                        this.addPackage(packages[i]);
                    }
                }

                if (typeof configuration.compileLessFiles !== 'undefined') {
                    this.addLessFile(configuration.compileLessFiles);
                }

                if (typeof configuration.imageDestination !== 'undefined') {
                    this.setImageDestination(configuration.imageDestination);
                }

                if (typeof configuration.stylesheetDestination !== 'undefined') {
                    this.setStylesheetDestination(configuration.stylesheetDestination);
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
            _validateConfigurationReader.call(this);
        }).call(this);
    }


    /**
     * Return Configuration class.
     */
    return ConfigurationStruct;
})();
