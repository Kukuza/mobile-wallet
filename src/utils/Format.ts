const Format = {
    
    /**
     * Convert a Json string to a Json object
     * @param str Json string
     * @returns Object
     */
     toObject: function(str: string) {
        return JSON.parse(str)
    }

};

export default Format;

