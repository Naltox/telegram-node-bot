'use strict'

const CHAT_STORAGE = 'chatStorage'
const USER_STORAGE = 'userStorage'

class TelegramSessionStorage {
    /**
     *
     * @param {BaseStorage} storage
     */
    constructor(storage) {
        this._storage = storage
        this._cache = {}
    }

    /**
     * @param {number} userId
     * @param {string} key
     * @returns {Promise<*>}
     */
    getUserSession(userId, key) {
        return this._storage.get(
            USER_STORAGE,
            this._generateKeyForUserSession(userId, key)
        )
    }

    /**
     * @param {number} userId
     * @param {string} key
     * @param {*} value
     * @returns {Promise}
     */
    setUserSession(userId, key, value) {
        return this._storage.set(
            USER_STORAGE,
            this._generateKeyForUserSession(userId, key),
            value
        )
    }

    /**
     * @param {number} chatId
     * @param {string} key
     * @returns {Promise<*>}
     */
    getChatSession(chatId, key) {
        return this._storage.get(
            CHAT_STORAGE,
            this._generateKeyForUserSession(chatId, key)
        )
    }

    /**
     * @param {number} chatId
     * @param {string} key
     * @param {*} value
     * @returns {Promise}
     */
    setChatSession(chatId, key, value) {
        return this._storage.set(
            USER_STORAGE,
            this._generateKeyForUserSession(chatId, key),
            value
        )
    }

    /**
     * @param {number} userId
     * @param {string} key
     * @returns {string}
     * @private
     */
    _generateKeyForUserSession(userId, key) {
        return `USER_${userId}_${key}`
    }

    /**
     * @param {number} chatId
     * @param {string} key
     * @returns {string}
     * @private
     */
    _generateKeyForChatSession(chatId, key) {
        return `CHAT_${chatId}_${key}`
    }
}

module.exports = TelegramSessionStorage