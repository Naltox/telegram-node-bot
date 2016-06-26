'use strict'

/**
 * Represents Localization file
 */
class Localization {
    /**
     *
     * @param {String} lang
     * @param {Object} phrases
     */
    constructor(lang, phrases) {
        this._lang = lang
        this._phrases = phrases
    }

    /**
     * 
     * @returns {String}
     */
    get lang() {
        return this._lang
    }

    /**
     *
     * @returns {Object}
     */
    get phrases() {
        return this._phrases
    }

    /**
     *
     * @param {Object} raw
     * @returns {Localization}
     */
    static deserialize(raw) {
        return new Localization(raw.lang, raw.phrases)
    }
}

module.exports = Localization