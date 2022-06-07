import {FLAG_SPAIN, FLAG_US, FLAG_KE } from "../assets/images";

export default [
    {
        "code": "ke", 
        "name": "Kenya",
        "language": {
            code: "en",
            language: "English",
            image: FLAG_KE,
          }, 
        "encoding": "utf-8", 
        "currency": "kes",
        "providers": [{"provider": "mpesa"}]
    },
    {
        "code": "es", 
        "name": "Kenya",
        "language": {
            code: "es",
            language: "Español", 
            image: FLAG_SPAIN,
          }, 
        "encoding": "utf-8", 
        "currency": "euro",
        "providers": []
    },
    {
        "code": "us", 
        "name": "United States",
        "language": {
            code: "en",
            language: "English",
            image: FLAG_US,
          }, 
        "encoding": "utf-8", 
        "currency": "usd",
        "providers": []
    },
]