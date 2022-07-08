import Format from "./Format";

export default class Phrase {
    
    protected selectedPhrase = [];

    /**
     * Check if the selected word in phrase
     * is in the right position on the phrase
     * and update the selected phrase array
     * @param phrase Generated phrase
     * @param key Key
     * @param value Value to validate
     */
    updateSelection (phrase: string[], key: number, value: string) {
        try {
            let valid = false;

            

            return valid;
        } catch (ex) {
            console.log(ex);
        } 
    }

    /**
     * Validate that the words order the user has
     * selected are correct and in correct order
     * @param phrase Generated phrase
     * @param selected The phrase in order of user selection
     */
    confirmed(phrase: string[]) {
        try {
            let matched = false;

            return matched;
        } catch (ex) {
            console.log(ex);
        }
    }

}