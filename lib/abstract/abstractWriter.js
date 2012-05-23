module.exports = (function() {
    function AbstractWriter() {
        /**
         * handleEachPackage function.
         *
         * Handles each package and forward it to
         * the handleEachImage function.
         *
         * @access public
         * @return void
         */
        this.handleEachPackage = function() {
            var package; while (package = this.packages.next()) {
                this.handleEachImage(package);
            }
        }


        /**
         * handleEachImage function.
         *
         * Handle each image and forward it to
         * the write element function of child class.
         *
         * @access public
         * @param  object package
         * @return void
         */
        this.handleEachImage = function(package) {
            var image; while (image = package.getImages().next()) {
                this.writeElement(package, image);
            }
        }
    }


    /**
     * Return initiated AbstractWriter class.
     */
    return AbstractWriter;
})();