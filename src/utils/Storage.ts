import AsyncStorage from "@react-native-async-storage/async-storage";
import Format from "./Format";

const Storage = {
    
    /**
     * store a value to local storage
     * @param key Key
     * @param value Data
     */
    save: function(key: string, value: string) {
        try {
            AsyncStorage.setItem(key, value);
        } catch (ex) {
            console.log(ex);
        } 
    },

    /**
     * Get a value stored in local storage
     * @param key Key
     */
    get: async function(key: string) {
        try {
            let str = await AsyncStorage.getItem(key);

            return Format.toObject(str!);
        } catch (ex) {
            console.log(ex);
        }
    },

    /**
     * Delete a value stored in local storage
     * @param key Key
     */
     remove: function(key: string) {
        try {
            AsyncStorage.removeItem(key);
        } catch (ex) {
            console.log(ex);
        }
    }
};

export default Storage;