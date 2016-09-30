'use strict'

/**
 *  TelegramApiError
 */
class TelegramApiError {
    /**
     *
     * @param {number} code
     * @param {string} description
     */
    constructor(code, description) {
        this._code = code
        this._description = description
    }

    /**
     *
     * @returns {number}
     */
    get code() {
        return this._code
    }

    /**
     *
     * @returns {string}
     */
    get description() {
        return this._description
    }

    /**
     *
     * @param {Object} raw
     * @returns {TelegramApiError}
     */
    static fromResponse(raw) {
        return new TelegramApiError(raw.error_code, raw.description)
    }
}

module.exports = TelegramApiError