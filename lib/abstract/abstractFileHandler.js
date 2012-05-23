var fs   = require('fs')
  , path = require('path');

module.exports = (function() {
    function AbstractFileHandler() {
        /**
         * analyseImagePath function.
         *
         * Analyse files which exists inside a given location which
         * are a type of image.
         *
         * @access public
         * @param  object|string location
         * @return array
         */
        this.analyseImagePath = function(location) {
            return _analysePath(location, ['jpg', 'jpeg', 'png', 'gif', 'bmp']);
        }


        /**
         * isImagePath function.
         *
         * Check if given string is a valid image path.
         *
         * @access public
         * @param  string location
         * @return boolean
         */
        this.isImagePath = function(location) {
            if (this.analyseImagePath(location).length === 1) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * analyseStylesheetPath function.
         *
         * Analyse files which exists inside a given location which
         * are a type of stylesheet.
         *
         * @access public
         * @param  object|string location
         * @return array
         */
        this.analyseStylesheetPath = function(location) {
            return _analysePath(location, ['css', 'less']);
        }


        /**
         * isStylesheetPath function.
         *
         * Check if given string is a valid image path.
         *
         * @access public
         * @param  string location
         * @return boolean
         */
        this.isStylesheetPath = function(location) {
            if (this.analyseStylesheetPath(location).length === 1) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * analyseJsonPath function.
         *
         * Analyse files which exists inside a given location which
         * are a type of Json.
         *
         * @access public
         * @param  object|string location
         * @return array
         */
        this.analyseJsonPath = function(location) {
            return _analysePath(location, ['json']);
        }


        /**
         * isJsonPath function.
         *
         * Check if given string is a valid json path.
         *
         * @access public
         * @param  string location
         * @return boolean
         */
        this.isJsonPath = function(location) {
            if (this.analyseJsonPath(location).length === 1) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * isDirectory function.
         *
         * Check if given string is a valid directory.
         *
         * @access public
         * @param  string location
         * @return boolean
         */
        this.isDirectory = function(location) {
            // Check if location exists.
            var existsLocation = path.existsSync(location);
            // Get dirname of location.
            var dirname = path.dirname(location);
            // Check if dirname of location exists.
            var existsDirname = path.existsSync(dirname);

            if (existsLocation === true) {
                // Get location information.
                var type = fs.statSync(location);

                // Check if location is directory.
                if (type.isDirectory()) {
                    return true;
                // If file exists then check if diretory is exists.
                } else if (type.isFile()) {
                    if (dirname === '.') {
                        return true;
                    } else {
                        return this.isDirectory(dirname);
                    }
                } else {
                    return false;
                }
            // Check if directory exists if non existing file is given.
            } else if (existsDirname === true) {
                if (dirname === '.') {
                    return true;
                } else {
                    return this.isDirectory(dirname);
                }
            }
        }


        /**
         * readFile function.
         *
         * Read file.
         *
         * @access public
         * @param  string location
         * @return string
         */
        this.readFile = function(location) {
            if (path.existsSync(location)) {
                return fs.readFileSync(location, 'utf8');
            } else {
                return false;
            }
        }


        /**
         * readJsonFile function.
         *
         * Read file and parse json.
         *
         * @access public
         * @param  string location
         * @return object
         */
        this.readJsonFile = function(location) {
            if (path.existsSync(location)) {
                var file = fs.readFileSync(location, 'utf8');
                return JSON.parse(file);
            } else {
                return false;
            }
        }


        /**
         * _analysePath function.
         *
         * Analyse files which exists inside a given location.
         *
         * @access public
         * @param  object|string location
         * @param  array         fileTypes
         * @return array
         */
        var _analysePath = function(location, fileTypes) {
            // Create elements array.
            var elements = new Array();

            // Check if given location is a string.
            if (typeof location === 'string') {
                elements = _analysePathString(location);
            // Check if given location is an object.
            } else if (typeof location === 'object') {
                elements = _analysePathObject(location);
            }

            elements = _checkFileTypes(elements, fileTypes);

            // Return elements.
            return elements;
        }

        /**
         * _analysePathString function.
         *
         * Analyse a given path as string. Returns all files
         * which are inside a directory or which exists directly.
         *
         * @access private
         * @param  string location
         * @return array
         */
        var _analysePathString = function(location) {
            // Check if location exists.
            var existsLocation = path.existsSync(location);
            // Create elements array.
            var elements = new Array();

            if (existsLocation === true) {
                // Get location information.
                var type = fs.statSync(location);

                // Check if string location is a directory.
                if (type.isDirectory()) {
                    // Get all files inside the directory.
                    var files = fs.readdirSync(location);

                    // Push each file to elements array.
                    for (var i in files) {
                        elements.push(path.join(location, files[i]));
                    }

                    // Sort all files by name.
                    elements.sort();
                // Check if string location is a file.
                } else if (type.isFile()) {
                    // Push location to elements array.
                    elements.push(location);
                }
            }

            // Return elements.
            return elements;
        }


        /**
         * _analysePathObject function.
         *
         * Analyse a given path as object. Returns all files
         * which are inside a directory or which exists directly.
         *
         * @access private
         * @param  string location
         * @return array
         */
        var _analysePathObject = function(location) {
            // Create elements array.
            var elements = new Array();

            // Get each location inside the object.
            for (var i in location) {
                // Check if location exists.
                var existsLocation = path.existsSync(location[i]);

                if (existsLocation === true) {
                    // Get location information.
                    var type = fs.statSync(location[i]);

                    // Check if string location is a directory.
                    if (type.isDirectory()) {
                        // Get all files given by location string name.
                        var analysedElements = _analysePathString(location[i]);

                        // Each result will pushed to elements array.
                        for (var j in analysedElements) {
                            elements.push(analysedElements[j]);
                        }
                    // Check if string location is a file.
                    } else if (type.isFile()) {
                        // Push location to elements array.
                        elements.push(location[i]);
                    }
                }
            }

            // Return elements.
            return elements;
        }


        /**
         * _checkFileTypes function.
         *
         * Check if given files are matching with the file type.
         * If not, the file will be removed from the elements array.
         *
         * @access private
         * @param  array elements
         * @param  array fileTypes
         * @return array
         */
        var _checkFileTypes = function(elements, fileTypes) {
            // Build regexp string.
            fileTypes = new RegExp('^.*\.(' + fileTypes.join('|') + ')$');

            // Check each element inside the array.
            for (var i in elements) {
                // Get the current element.
                var element = elements[i];

                // Check if the element is matching with the given file types.
                if (fileTypes.test(element) === false) {
                    // Delete element.
                    delete elements[i];
                }
            }


            // Sort elements.
            elements.sort();

            // Return elements.
            return elements;
        }
    }


    /**
     * Return initiated AbstractStruct class.
     */
    return AbstractFileHandler;
})();