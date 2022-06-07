import { Platform } from 'react-native';
import locales from './locale.config.json';

export default {
    DEFAULT_CURRENCY: process.env.DEFAULT_CURRENCY,
    DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
    DEFAULT_ENCODING: process.env.DEFAULT_ENCODING,
    DEFAULT_COUNTRY: process.env.DEFAULT_COUNTRY,
    CONTRACT_KIT_URI: process.env.CONTRACT_KIT_URI,
    CONTRACT_KIT_LISTENER: process.env.CONTRACT_KIT_LISTENER, 
    CURRENCY_LAYER_BASE_URI: process.env.CURRENCY_LAYER_BASE_URI,
    CURRENCY_LAYER_API_KEY: process.env.CURRENCY_LAYER_API_KEY,
    PLATFORM: Platform.select({
            android: 'ANDROID',
            ios: 'IOS'
        }
    ),
    ENV: __DEV__ ? "DEV" : "PROD",
    LOCALES: locales,
}