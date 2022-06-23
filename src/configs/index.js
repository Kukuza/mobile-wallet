import { Platform } from 'react-native';
import locales from './locale.config';
import currencies from './currencies.config';
import languages from './languages.config';
import {
    DEFAULT_CURRENCY,
    DEFAULT_LANGUAGE,
    DEFAULT_ENCODING,
    DEFAULT_COUNTRY,
    CONTRACT_KIT_URI,
    CONTRACT_KIT_LISTENER,
    CURRENCY_LAYER_BASE_URI,
    CURRENCY_LAYER_API_KEY
} from "@env"

export default {
    DEFAULT_CURRENCY:DEFAULT_CURRENCY,
    DEFAULT_LANGUAGE:DEFAULT_LANGUAGE,
    DEFAULT_ENCODING:DEFAULT_ENCODING,
    DEFAULT_COUNTRY:DEFAULT_COUNTRY,
    CONTRACT_KIT_URI:CONTRACT_KIT_URI,
    CONTRACT_KIT_LISTENER:CONTRACT_KIT_LISTENER, 
    CURRENCY_LAYER_BASE_URI:CURRENCY_LAYER_BASE_URI,
    CURRENCY_LAYER_API_KEY:CURRENCY_LAYER_API_KEY,
    PLATFORM: Platform.select(
        {
            android: 'ANDROID', 
            ios: 'IOS'
        }
    ),
    ENV: __DEV__ ? "DEV" : "PROD",
    LOCALES: locales,
    LANGUAGES: languages,
    CURRENCIES: currencies
}