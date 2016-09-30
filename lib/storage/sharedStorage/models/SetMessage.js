'use strict'

class SetMessage {
    /**
     * @param {string} storage
     * @param {string} key
     * @param {object} value
     * @param {string} id
     */
    constructor(storage, key, value, id) {
        this._storage = storage
        this._key = key
        this._value = value
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
     * @returns {object}
     */
    get value() {
        return this._value
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
            value: this._value,
            id: this._id
        }
    }

    /**
     * @param {object} raw
     * @returns {SetMessage}
     */
    static deserialize(raw) {
        return new SetMessage(
            raw.storage,
            raw.key,
            raw.value,
            raw.id
        )
    }
}

module.exports = SetMessage