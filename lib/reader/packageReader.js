module.exports = (function() {
    function PackageReader(package) {
        var _package = package;
        
        
        this.load = function() {
            if (typeof _package === 'object') {
                return _package;
            } else {
                throw 'can not read packages';
            } 
        }
    }
    
    
    /**
     * Return PackageReader class.
     */
    return PackageReader;
})();
