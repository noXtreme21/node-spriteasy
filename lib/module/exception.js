module.exports = (function() {
    Exception.prototype = require(SPRITEASY_PATH_MODULE + '/output');
    
    
    function Exception() {
        this.handle = function(exception) {
            this.error(exception);
        }
    }
    
    
    /**
     * Return initiated Exception class.
     */
    return new Exception();
})();
