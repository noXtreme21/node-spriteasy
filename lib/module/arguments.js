module.exports = (function() {
    function Arguments() {
        /**
         * Define a pattern which an argument must match.
         *
         * @access private
         * @var    RegExp
         */
        var _pattern    = '-([a-z]{1}|-[a-z]{1,})([ = ]{1,}("[^"]|[^ ]{1,})){0,1}';
        
        /**
         * This variable contains system arguments.
         *
         * @access private
         * @var    array
         */
        var _arguments  = process.argv;
        
        /**
         * A list of all valid arguments.
         *
         * @access private
         * @var    object
         */
        var _properties = new Object();
        
        /**
         * Settings of arguments which can handled by this
         * application.
         *
         * @access private
         * @var    object
         */
        var _settings = {
            'help': {
                'alias': 'h'
              , 'description': 'configuration pathname'
              , 'validator': 'boolean'
              , 'regexp': null
            }
          , 'configuration': {
                'alias': 'c'
              , 'description': 'configuration pathname'
              , 'validator': 'string'
              , 'regexp': null
            }
          , 'directory': {
                'alias': 'd'
              , 'description': 'direcory pathname'
              , 'validator': 'string'
              , 'regexp': null
            }
        }
        
        
        /**
         * getArgument function.
         *
         * Provides a function to get a argument.
         * 
         * @access public
         * @param  string property
         * @return string
         */
        this.getArgument = function(property) {
            // Check if property exists.
            if (typeof _properties[property] !== 'undefined') {
                return _properties[property];
            } else {
                return false;
            }
        }
        
        
        /**
         * _formatArguments function.
         * 
         * Format process argv array and split each argument
         * to an array.
         *
         * @access private
         * @return void
         */
        var _formatArguments = function() {
            // Remove the first two entries.
            for (var i = 0; i < 2; i++) { _arguments.shift(); }
            // Replace comma to space.
            _arguments = String(_arguments).replace(/,/g, ' ');
            // Match arguments on regexp pattern.
            _arguments = _arguments.match(new RegExp(_pattern, 'gi'));
        }
        
        
        /**
         * _readProperties function.
         *
         * Read each argument which is defined.
         * 
         * @access private
         * @return void
         */
        var _readProperties = function() {
            // Check each setted argument.
            for (var i in _arguments) {
                // Get current argument.
                var argument  = _arguments[i].match(new RegExp(_pattern, 'i'));
                // Validate argument.
                _validateArguments(argument);
            }
        }
        
        
        /**
         * _validateArguments function.
         *
         * Validate each defined argument. Check insert type and
         * validate in base of a regular expression.
         * 
         * @access private
         * @param  array argument
         * @return void
         */
        var _validateArguments = function(argument) {
            // Get key.
            var key       = String(argument[1]).replace(/-/, '');
            // Get value.
            var value     = (typeof argument[3] === 'undefined') ? true : String(argument[3]);
            
            // Check if alias is defined. If yes replace with original name.
            for (var identifier in _settings) {
                if (_settings[identifier].alias === key) {
                    key = identifier;
                }
            }
            
            // Validate argument.
            for (var identifier in _settings) {
                if (identifier === key) {
                    // Check type of value.
                    if (typeof value !== _settings[identifier].validator) {
                        // EXCEPTION
                    }
                    
                    // Match value with regexp.
                    if (_settings[identifier].regexp !== null && _settings[identifier].regexp.test(value) === false) {
                        // EXCEPTION
                    }
                }
            }
            
            // Append value to properties array.
            _properties[key] = value;
        }
        
        
        /**
         * _handleSystemArguments function.
         *
         * Handle all system events.
         * 
         * @access private
         * @return void
         */
        var _handleSystemArguments = function() {
            // Check if help is required.
            if (this.getArgument('help')) {
                _showHelp();
            }
        }
        
        
        /**
         * _showHelp function.
         * 
         * Show help instructions.
         *
         * @access private
         * @return void
         */
        var _showHelp = function() {
            // Display help instructions.
            console.log('HELP INSTRUCTIONS');
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
            // Format all arguments.
            _formatArguments();
            // Read user input.
            _readProperties();
            // Handle arguments which are controlled by system.
            _handleSystemArguments.call(this);
        }).call(this);
        
    }
    
    
    /**
     * Return initiated Arguments class.
     */
    return new Arguments();
})();
