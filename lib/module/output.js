module.exports = (function() {
    function Output() {
        this.log = function(message) {
            console.log(message);
        }
        
        
        this.info = function(message) {
            console.log(message);
        }
        
        
        this.error = function(message) {
            console.error(message);
        }
    }
    
    
    /**
     * Return initiated Output class.
     */
    return new Output();
})();
