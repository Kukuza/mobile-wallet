const Validator = {

    /**
     * Check if a string value is empty
     * @param str String
     * @returns boolean
     */
    isEmpty: function(str: any): boolean {
        return (!str) 
            ? true 
            : false;
    },

    /**
     * Check if string length is equal to or greater than 
     * the min number required
     * @param str String
     * @param min Minimun number of characters
     * @returns boolean
     */
     minChars: function(str: any, min: number): boolean {
        return (str.length >= min) 
            ? true 
            : false;
    },

    /**
     * Check if string length is less than or equal to 
     * the max number required
     * @param str Value
     * @param max Maximum number of characters
     * @returns boolean
     */
     maxChars: function(str: any, max: number): boolean {
        return (str.length <= max) 
            ? true 
            : false;
    },

    /**
     * Check if a value is numeric
     * @param val Value
     * @returns boolean
     */
    isNumeric: function(val: any): boolean {
        //TODO: implement
        return false;
    },

    /**
     * Check if a value has a valid email address format
     * @param str String
     * @returns boolean
     */
     isEmail: function(str: any): boolean {
        //TODO: implement
        return false;
    }

};

export default Validator;