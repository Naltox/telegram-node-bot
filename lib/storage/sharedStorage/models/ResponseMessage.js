'use strict'

class ResponseMessage {
    /**
     * @param {object} data
     * @param {string} id
     */
    constructor(data, id) {
        this._data = data
        this._id = id
    }

    /**
     * @returns {object}
     */
    get data() {
        return this._data
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
            data: this._data,
            id: this._id
        }
    }

    /**
     * @param {object} raw
     * @returns {ResponseMessage}
     */
    static deserialize(raw) {
        return new ResponseMessage(
            raw.data,
            raw.id
        )
    }
}

module.exports = ResponseMessage