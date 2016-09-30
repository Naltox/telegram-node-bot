'use strict'

const GetMessage = require('./GetMessage')
const SetMessage = require('./SetMessage')
const RemoveMessage = require('./RemoveMessage')
const ResponseMessage = require('./ResponseMessage')

class Message {
    constructor(type, payload) {
        this._type = type
        this._payload = payload
    }

    /**
     * @param {string} storage
     * @param {string} key
     * @param {string} id
     */
    static get(storage, key, id) {
        return new Message('get', new GetMessage(storage, key, id))
    }

    /**
     * @param {string} storage
     * @param {string} key
     * @param {object} value
     * @param {string} id
     */
    static set(storage, key, value, id) {
        return new Message('set', new SetMessage(storage, key, value, id))
    }

    /**
     * @param {string} storage
     * @param {string} key
     * @param {string} id
     */
    static remove(storage, key, id) {
        return new Message('remove', new RemoveMessage(storage, key, id))
    }

    /**
     * @param {object} data
     * @param {string} id
     * @returns {Message}
     */
    static response(data, id) {
        return new Message('response', new ResponseMessage(data, id))
    }

    /**
     * @returns {object}
     */
    serialize() {
        return {
            type: this._type,
            payload: this._payload.serialize()
        }
    }

    static deserialize(raw) {
        switch (raw.type) {
            case 'get':
                return GetMessage.deserialize(raw.payload)
                break

            case 'set':
                return SetMessage.deserialize(raw.payload)
                break

            case 'remove':
                return RemoveMessage.deserialize(raw.payload)
                break

            case 'response':
                return ResponseMessage.deserialize(raw.payload)
                break

            default:
                return null
                break
        }
    }
}

module.exports = Message