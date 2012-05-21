var fs   = require('fs')
  , path = require('path');

module.exports = (function() {
    function PackageReader(package) {
        var _package = package;
        
        
        this.load = function() {
            if (typeof _package === 'object') {
                return _package;
            } else if (typeof _package === 'string' && path.existsSync(_package) === true) {
                var type = fs.statSync(_package);
                if (type.isFile()) {
                    if (path.extname(_package) === '.json') {
                        var file = fs.readFileSync(_package, 'utf8');
                        var package = JSON.parse(file);
                        return package;
                    }
                } else {
                    throw 'directory given but configuration file is needed';
                }
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
