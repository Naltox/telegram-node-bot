'use strict'

class RemoveMessage {
    /**
     * @param {string} storage
     * @param {string} key
     * @param {string} id
     */
    constructor(storage, key, id) {
        this._storage = storage
        this._key = key
        this._id = id
    }

    /**
     * @returns {string}
     */
    get storage() {
        return this._storage
    }

    /**
     * @returns {string}
     */
    get key() {
        return this._key
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id
    }

    /**
     * @returns {object}
     */
    serialize() {
        return {
            storage: this._storage,
            key: this._key,
            id: this._id
        }
    }

    /**
     * @param {object} raw
     * @returns {RemoveMessage}
     */
    static deserialize(raw) {
        return new RemoveMessage(
            raw.storage,
            raw.key,
            raw.id
        )
    }
}

module.exports = RemoveMessage