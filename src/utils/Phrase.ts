import Format from "./Format";

export default class Phrase {
    
    /** Store the values the user has selected */
    protected static selectedPhrase: string[] = [];

    /** Stores the values the user selects words from */
    protected static random: string[] = [];

    /**
     * Update the selected phrase array with selected value
     * @param value Value to be added on the confirmation array
     * @returns number
     */
    static updateSelected (value: string): number {
        try {
            if(Phrase.selectedPhrase.length < 25) {
                Phrase.selectedPhrase.push(value);

                return Phrase.selectedPhrase.length;
            }else {
                return Phrase.selectedPhrase.length;
            } 
        } catch (ex) {
            console.error(ex);
            return Phrase.selectedPhrase.length;
        } 
    }

    /**
     * Validate that the words order the user has
     * selected are correct and in correct order
     * @returns boolean
     */
    static confirm(phrase: string[]): boolean {
        try {
            if(phrase.length != 24 
                && Phrase.selectedPhrase.length != 24) 
                return false;

            for (let i = 0; i < phrase.length; i++) {
                const _generated = phrase[i];
                const _selected = Phrase.selectedPhrase[i];
                if(_generated != _selected) 
                    return false;
            }
            
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }

    /**
     * Generate six random words from the phrase 
     * for the user to select from based on the current 
     * count of the selectedPhrase array
     * @returns array
     */
     static getRandomWords(phrase: string[]): string[] {
        try {
            let _random: string[] = [];
            let _currLength = Phrase.selectedPhrase.length;

            /* 
                reset selected phrase for the user to try again
                if confirm method returns false
             */
            if(_currLength > 23) 
                Phrase.selectedPhrase = [];

            if(Phrase.selectedPhrase.length < 6) {
                _random = phrase.slice( 0 , 6);
            }else if(_currLength > 5 && _currLength < 12) {
                _random = phrase.slice( 6 , 12);
            }else if(_currLength > 11 && _currLength < 18) {
                _random = phrase.slice( 12 , 18);
            }else if(_currLength > 17 && _currLength < 24) {
                _random = phrase.slice( 18 , 24);
            }

            //TODO: randomize values in the array the user picks word from
            Phrase.random = _random;

            return Phrase.random;
        } catch (ex) {
            console.error(ex);
            return Phrase.random;
        }
    }

    /**
     * Convert number passed to words 
     * @param nextCount The next number to be converted
     * @returns string
     */
     static numberToWord(nextCount: number): string {
        try {
            //TODO: implement number to word
            return nextCount.toString();
        } catch (ex) {
            console.error(ex);
            return "";
        }
    }

}