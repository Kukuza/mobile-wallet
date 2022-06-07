import { Platform } from 'react-native';

export default {
    API_URL: process.env.API_URL, 
    API_TOKEN: process.env.API_TOKEN,
    PLATFORM: Platform.select({
        android: 'ANDROID',
        ios: 'IOS'
    }),
    ENV: __DEV__ ? "DEV" : "PROD"
}
