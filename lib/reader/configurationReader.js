var fs   = require('fs')
  , path = require('path');

module.exports = (function() {
    function ConfigurationReader(configuration) {
        var _configuration = configuration;
        
        
        /**
         * load function.
         *
         * Reads a json configuration file. After loading
         * the file will be parsed.
         * 
         * @access public
         * @return Object
         */
        this.load = function() {
            if (typeof _configuration === 'string' && path.existsSync(_configuration) === true) {
                var type = fs.statSync(_configuration);
                if (type.isFile()) {
                    if (path.extname(_configuration) === '.json') {
                        var file = fs.readFileSync(_configuration, 'utf8');
                        var configuration = JSON.parse(file);
                        return configuration;
                    }
                } else {
                    throw 'directory given but configuration file is needed';
                }
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
