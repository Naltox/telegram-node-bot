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
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise<Object>}
     */
    getUserSession(userId) {
        return this._storage.get(USER_STORAGE, userId)
    }

    /**
     *
     * @param {number} userId
     * @param {Object} session
     */
    setUserSession(userId, session) {
        this._storage.set(USER_STORAGE, userId, session)
    }

    /**
     *
     * @param {number} userId
     */
    removeUserSession(userId) {
        this._storage.remove(USER_STORAGE, userId)
    }

    /**
     *
     * @param {number} chatId
     * @returns {Promise<Object>}
     */
    getChatSession(chatId) {
        return this._storage.get(CHAT_STORAGE, chatId)
    }

    /**
     *
     * @param {number} chatId
     * @param {Object} session
     */
    setChatSession(chatId, session) {
        this._storage.set(CHAT_STORAGE, chatId, session)
    }

    /**
     *
     * @param {number} chatId
     */
    removeChatSession(chatId) {
        this._storage.remove(CHAT_STORAGE, chatId)
    }
}

module.exports = TelegramSessionStorage