'use strict'

const Localization = require('./Localization')

const LOCALIZATION_STORAGE = 'localizationStorage'

/**
 * Localization class
 */
class Ivan {
    /**
     *
     * @param {BaseStorage} storage
     * @param {Object[]} localizations
     */
    constructor(storage, localizations) {
        this._storage = storage
        this._localizations = []
        this._loc = {}

        const locHandler = {
            set: () => {
                throw 'Cant set value for localization'
            },
            get: (target, key, receiver) => {
                let loc = this.localizationForLanguage(key)
                if (loc) {
                    return this.localizationForLanguage(key)
                }
                else {
                    return Reflect.get(target, key, receiver)
                }
            }
        }
        localizations.forEach(localization => {
            if (!this._checkLocalization(localization)) throw `Wrong localization: ${localization}`

            this._localizations.push(Localization.deserialize(localization))
        })

        return new Proxy(this, locHandler)
    }

    /**
     * Translates localized string to other language
     *
     * @param {string} localizedString
     * @param {string} toLang
     * @returns {string}
     */
    translate(localizedString, toLang) {
        return this.loc[toLang][this.getPhraseKey(localizedString)]
    }

    /**
     * Returns phrases for user by userId
     *
     * @param {number} userId
     * @returns {Promise<Object>}
     */
    forUser(userId) {
        return this.getLanguageForUser(userId)
            .then(lang => {
                return this.localizationForLanguage(lang)
            })
    }

    /**
     * Sets language for user by userId
     *
     * @param {number} userId
     * @param {string} lang
     */
    setLanguageForUser(userId, lang) {
        this._storage.set(LOCALIZATION_STORAGE, userId, { lang: lang })
    }

    /**
     * Returns stored language for user by userId
     *
     * @param {number} userId
     * @returns {Promise<string>}
     */
    getLanguageForUser(userId) {
        return this._storage.get(LOCALIZATION_STORAGE, userId)
            .then(user => {
                if (user.lang) {
                    return user.lang
                }
                else {
                    throw 'No data for that user'
                }
            })
    }

    /**
     * Returns phrases for language
     *
     * @param {string} lang
     * @returns {Object|null}
     */
    localizationForLanguage(lang) {
        let loc = this._localizations.find(localization => localization.lang === lang)
        return loc ? loc.phrases : null
    }

    /**
     * Returns language by phrase
     * 
     * @param inputPhrase
     * @returns {string|null}
     */
    languageByPhrase(inputPhrase) {
        for (const loc of this._localizations) {
            for (const phrase in loc.phrases) {
                if (loc.phrases[phrase] === inputPhrase) {
                    return loc.lang
                }
            }
        }
        
        return null
    }

    /**
     * Returns the key name of phrase
     * 
     * @param {string} inputPhrase
     * @returns {string|null}
     */
    getPhraseKey(inputPhrase) {
        for (const loc of this._localizations) {
            for (const phrase in loc.phrases) {
                if (loc.phrases[phrase] === inputPhrase) {
                    return phrase
                }
            }
        }

        return null
    }

    /**
     *
     * @param {Object} rawLocalization
     * @returns {Boolean}
     * @private
     */
    _checkLocalization(rawLocalization) {
        return rawLocalization.lang && rawLocalization.phrases
    }
}

module.exports = Ivan