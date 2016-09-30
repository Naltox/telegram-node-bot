'use strict'

class TelegramSession {
    /**
     * @param {Object} userSession
     * @param {Object} chatSession
     */
    constructor(userSession, chatSession) {
        this._userSession = userSession
        this._chatSession = chatSession
    }

    /**
     * @returns {Object}
     */
    get userSession() {
        return this._userSession
    }

    /**
     * @returns {Object}
     */
    get chatSession() {
        return this._chatSession
    }
}

module.exports = TelegramSession