module.exports = (function() {
    function Writer(configuration, packages) {
        var _configuration    = configuration
          , _packages         = packages
          , _writerCollection = new SPRITEASY.Collection();
        
        
        this.addWriter = function() {
            for (i in arguments) {
                var writer = arguments[i];
                _writerCollection.append(writer);
            }
            
            return this;
        }
        
        
        this.write = function() {
            var writer; while (writer = _writerCollection.next()) {
                new writer(_configuration, _packages).write();
            }
            return this;
        }
    }
    
    
    /**
     * Return Writer class.
     */
    return Writer;
})();