module.exports = (function() {
    /**
     * Inherit from AbstractFileHandler.
     */
    ConfigurationReader.prototype = new SPRITEASY.AbstractFileHandler();


    function ConfigurationReader(configuration) {
        /**
         * Configuration path location.
         *
         * @access private
         * @var    string
         */
        var _configuration = configuration;


        /**
         * load function.
         *
         * Reads a json configuration file. After loading
         * the file will be parsed.
         *
         * @access public
         * @return object
         */
        this.load = function() {
            // If json configuration file exists.
            if (typeof _configuration === 'string' && this.isJsonPath(_configuration) === true) {
                // Read file and parse json.
                var configuration = this.readJsonFile(_configuration);
                // Return configuration object.
                return configuration;
            } else {
                throw 'configuration file \'' + _configuration + '\' does not exist';
            }
        }
    }


    /**
     * Return ConfigurationReader class.
     */
    return ConfigurationReader;
})();
