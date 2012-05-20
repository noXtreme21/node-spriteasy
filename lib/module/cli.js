module.exports = (function() {
    Cli.prototype = require(SPRITEASY_PATH_MODULE + '/arguments');
    
    
    function Cli() {
        var _configuration = new Object();
        var _packages      = new SPRITEASY.Collection();
        
        if (this.getArgument('configuration') !== null) {
            _configuration = new SPRITEASY.ConfigurationStruct(
                new SPRITEASY.ConfigurationReader(this.getArgument('configuration'))
            );
            
            var package; while (package = _configuration.getPackages().next()) {
                _packages.append(
                    new SPRITEASY.PackageStruct(
                        new SPRITEASY.PackageReader(package)
                      , _configuration
                    )
                );
            }
        } else if (this.getArgument('directory') !== null) {
        
        }
        
        var writer = new SPRITEASY.Writer(
            _configuration
          , _packages
        ).addWriter(
            SPRITEASY.ImageWriter
          , SPRITEASY.StylesheetWriter
        ).write();
    }
    
    
    /**
     * Return initiated Cli class.
     */
    return new Cli();
})();
