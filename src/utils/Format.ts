const Format = {
    
    /**
     * Convert a Json string to a Json object
     * @param str Json string
     * @returns Object
     */
     toObject: function(str: string) {
        return JSON.parse(str)
    },

    /**
     * 
     * @param str String
     * @param separator Separator
     * @returns array
     */
    toArray: function(str: string, separator?: string): string[] {
        if(!separator) separator = " ";

        return str.split(separator);
    }

};

export default Format;

