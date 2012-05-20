module.exports = (function() {
    /**
     * Spriteasy function.
     *
     * It's the core class. If spriteasy is running in cli mode
     * it loads the cli class. If it's loaded by a node application
     * it loads the app class.
     * 
     * @access public
     * @return function
     */
    function Spriteasy() {
        var _exception = require(SPRITEASY_PATH_MODULE + '/exception');
        
        try {
            if (SPRITEASY_CLI_MODE === true) {
                return require(SPRITEASY_PATH_MODULE + '/cli');
            } else {
                return require(SPRITEASY_PATH_MODULE + '/app');
            }
        } catch (exception) {
            _exception.handle(exception);
        }
    }
    
    
    /**
     * Return initiated Spriteasy class.
     */
    return new Spriteasy();
})();
