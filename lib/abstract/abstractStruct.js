var fs   = require('fs')
  , path = require('path');

module.exports = (function() {
    function AbstractStruct() {
    
    
        this.analyseImagePath = function(imagePath) {
            var images = new Array();
            if (typeof imagePath === 'string') {
                var type = fs.statSync(imagePath);
                if (type.isDirectory()) {
                    var files = fs.readdirSync(imagePath);;
                    for (var i in files) {
                        images.push(path.join(imagePath, files[i]));
                    }

                    images.sort();
                } else if (type.isFile()) {
                    images.push(imagePath);
                }
            } else if (typeof imagePath === 'object') {
                for (var i in imagePath) {
                    var type = fs.statSync(imagePath[i]);
                    if (type.isDirectory()) {
                        var analysedImages = this.analyseImagePath(imagePath[i]);
                        for (var j in analysedImages) {
                            images.push(analysedImages[j]);
                        }
                    } else if (type.isFile()) {
                        images.push(imagePath[i]);
                    }
                }
            }

            return images;
        }
    }
    
    
    /**
     * Return initiated AbstractStruct class.
     */
    return new AbstractStruct();
})();