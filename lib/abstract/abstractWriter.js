module.exports = (function() {
    function AbstractWriter() {
        
        this.handleEachPackage = function() {
            var package; while (package = this.packages.next()) {
                this.handleEachImage(package);
            }
        }
        
        
        this.handleEachImage = function(package) {
            var image; while (image = package.getImages().next()) {
                this.writeElement(package, image);
            }
        }
    }
    
    
    /**
     * Return initiated AbstractWriter class.
     */
    return new AbstractWriter();
})();