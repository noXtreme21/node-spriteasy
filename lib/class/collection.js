module.exports = (function() {
    function Collection() {
        var _collection = new Array();
        var _iterator   = 0;
        
        
        this.append = function(collection) {
            collection.getIterator = this.getIterator;
            collection.hasNext = this.hasNext;
            _collection.push(collection);
        }
        
        
        this.hasNext = function() {
            if (_iterator < _collection.length) {
                return true;
            } else {
                return false;
            }
        }
        
        
        this.next = function() {
            if (_iterator < _collection.length) {
                return _collection[_iterator++];
            } else {
                _iterator = 0;
                return null;
            }
        }
        
        this.getIterator = function() {
            return parseInt(_iterator - 1);
        }
        
        
        this.reverse = function() {
            _collection.reverse();
        }
    }
    
    
    /**
     * Return Collection class.
     */
    return Collection;
})();
