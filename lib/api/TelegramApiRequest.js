'use strict'

/**
 * TelegramApiRequest
 */
class TelegramApiRequest { 
    /**
     *
     * @param {string} method
     * @param {Object} params
     * @param {Object} [multipart]
     */
    constructor(method, params, multipart) {
        this._method = method
        this._params = params
        this._multipart = multipart
    }

    /**
     *
     * @returns {string}
     */
    get method() {
        return this._method
    }

    /**
     *
     * @returns {Object}
     */
    get params() {
        return this._params
    }

    /**
     *
     * @returns {Object}
     */
    get multipart() {
        return this._multipart
    }
}

module.exports = TelegramApiRequest