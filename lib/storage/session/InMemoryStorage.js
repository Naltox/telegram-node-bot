'use strict'

const BaseStorage = require('../BaseStorage')

/**
 * Standard in memory storage, will be used if there is no custom storage passed Telegram
 */
class InMemoryStorage extends BaseStorage {
    constructor() {
        super()

        this._storage = {}
    }

    /**
     * @param {string} storage
     * @param {string} key
     * @returns {Promise<Object>}
     */
    get(storage, key) {
        return new Promise(resolve => {
            if (!this._storage[storage]) this._storage[storage] = {}

            resolve(this._storage[storage][key] || {})
        })
    }

    /**
     * @param {string} storage
     * @param {key} key
     * @param {Object} data
     */
    set(storage, key, data) {
        return new Promise(resolve => {
            if (!this._storage[storage]) this._storage[storage] = {}

            this._storage[storage][key] = data

            resolve()
        })
    }

    /**
     * @param {string} storage
     * @param {string} key
     */
    remove(storage, key) {
        return new Promise(resolve => {
            if (this._storage[storage] && this._storage[storage][key]) {
                this._storage[storage][key] = null
            }

            resolve()
        })
    }
}

module.exports = InMemoryStorage