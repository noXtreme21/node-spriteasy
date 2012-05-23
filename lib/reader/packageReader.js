module.exports = (function() {
    /**
     * Inherit from AbstractFileHandler.
     */
    PackageReader.prototype = new SPRITEASY.AbstractFileHandler();


    function PackageReader(package) {
        /**
         * Package object or path location.
         *
         * @access private
         * @var    object|string
         */
        var _package = package;


        /**
         * load function.
         *
         * Reads a package object or if string is given a json
         * configuration file will read and after loading the
         * file will be parsed.
         *
         * @access public
         * @return object
         */
        this.load = function() {
            // If package object is given.
            if (typeof _package === 'object') {
                // Return package object.
                return _package;
            // If json configuration file exists.
            } else if (typeof _package === 'string' && this.isJsonPath(_package) === true) {
                // Read file and parse json.
                var package = this.readJsonFile(_package);
                // Return package object.
                return package;
            } else {
                throw 'can not read packages';
            }
        }
    }


    /**
     * Return PackageReader class.
     */
    return PackageReader;
})();
