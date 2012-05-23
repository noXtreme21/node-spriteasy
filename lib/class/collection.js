module.exports = (function() {
    function Collection() {
        /**
         * Collection array.
         *
         * @access private
         * @var    array
         */
        var _collection = new Array();
        
        /**
         * Iterator of collection.
         *
         * @access private
         * @var    integer
         */
        var _iterator   = 0;


        /**
         * append function.
         *
         * Append a value to collection.
         *
         * @access public
         * @param  mixed collection
         * @return void
         */
        this.append = function(collection) {
            // Add getIterator function to collection.
            collection.getIterator = this.getIterator;
            // Add hasNext function to collection.
            collection.hasNext = this.hasNext;
            // Push to collection.
            _collection.push(collection);
        }


        /**
         * hasNext function.
         *
         * Check if collection has a next value.
         *
         * @access public
         * @return boolean
         */
        this.hasNext = function() {
            // Check if collection have a next value.
            if (_iterator < _collection.length) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * next function.
         *
         * Get the next value in this collection.
         *
         * @access public
         * @return mixed
         */
        this.next = function() {
            // Check if collection have a next value.
            if (_iterator < _collection.length) {
                // Return collection value.
                return _collection[_iterator++];
            } else {
                // Reset iterator to 0.
                _iterator = 0;
                // Return null.
                return null;
            }
        }


        /**
         * getIterator function.
         *
         * Get the current iterator count.
         *
         * @access public
         * @return integer
         */
        this.getIterator = function() {
            return parseInt(_iterator - 1);
        }


        /**
         * count function.
         *
         * Gets the count of all values inside
         * this collection.
         *
         * @access public
         * @return integer
         */
        this.count = function() {
            return parseInt(_collection.length);
        }
    }


    /**
     * Return Collection class.
     */
    return Collection;
})();
