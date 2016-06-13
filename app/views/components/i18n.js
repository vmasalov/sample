'use strict';

const VALID_LOCALES = ["en", "ru"];
const DEFAULT_LOCALE = "ru";

let currentLocale = DEFAULT_LOCALE;
let data = {};

export default class i18n {
    /**
     * Set desired locale
     * @param stringOrObject Object {value: String, label: String} or String "en"...
     */
    static setLocale(stringOrObject) {
        var result = false;

        // getting locale value;
        if (stringOrObject) {
            if (typeof(stringOrObject) == 'object') {
                if ('value' in stringOrObject) {
                    result = stringOrObject.value;
                }
            } else {
                if (typeof(stringOrObject) == 'string') {
                    if (stringOrObject in VALID_LOCALES) {
                        result = stringOrObject;
                    }
                }
            }
        }

        // validating locale value
        if (result) {
            currentLocale = result;
            return true;
        }

        return false;
    }

    static getLocale() {
        return currentLocale;
    }


    /**
     * Set locale data
     *
     * @param value
     */
    static setData(value) {
        if (value) {
            data[currentLocale] = value;
        }
    }


    /**
     * Return a localized value based on the language;
     * @param value
     */
    static getValue(value) {
        if (currentLocale in data) {
            if (value in data[currentLocale]) {
                return data[currentLocale][value]
            } else {
                return "MISSING LOCALE VALUE FOR: " + currentLocale + ", " + value;
            }
        }

        return "MISSING LOCALE: " + currentLocale;
    }
}