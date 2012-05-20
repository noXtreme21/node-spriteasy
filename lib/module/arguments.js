module.exports = (function() {
    function Arguments() {
        /**
         * Define a pattern which an argument must match.
         */
        var _pattern    = '-([a-z]{1}|-[a-z]{1,})([ = ]{1,}("[^"]|[^ ]{1,})){0,1}';
        
        /**
         * This variable contains system arguments.
         */
        var _arguments  = process.argv;
        
        /**
         * A list of all valid arguments.
         */
        var _properties = new Object();
        
        /**
         * Settings of arguments which can handled by this
         * application.
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
            if (typeof _properties[property] !== 'undefined') {
                return _properties[property];
            } else {
                return null;
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
            for (var i = 0; i < 2; i++) { _arguments.shift(); }
            _arguments = String(_arguments).replace(/,/g, ' ');
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
            for (var i in _arguments) {
                var argument  = _arguments[i].match(new RegExp(_pattern, 'i'));
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
            var key       = String(argument[1]).replace(/-/, '');
            var value     = (typeof argument[3] === 'undefined') ? true : String(argument[3]);
            
            for (var identifier in _settings) {
                if (_settings[identifier].alias === key) {
                    key = identifier;
                }
            }
            
            for (var identifier in _settings) {
                if (identifier === key) {
                    if (typeof value !== _settings[identifier].validator) {
                        // EXCEPTION
                    }
                    
                    if (_settings[identifier].regexp !== null && _settings[identifier].regexp.test(value) === false) {
                        // EXCEPTION
                    }
                }
            }
            
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
            _formatArguments();
            _readProperties();
            _handleSystemArguments.call(this);
        }).call(this);
        
    }
    
    
    /**
     * Return initiated Arguments class.
     */
    return new Arguments();
})();
