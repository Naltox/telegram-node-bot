'use strict'

const BaseStorage = require('../BaseStorage')
const Message = require('./models/Message')
const GetMessage = require('./models/GetMessage')
const SetMessage = require('./models/SetMessage')
const RemoveMessage = require('./models/RemoveMessage')
const ResponseMessage = require('./models/ResponseMessage')

/**
 * SharedStorage used to sync data between workers
 */
class SharedStorage extends BaseStorage {
    /**
     * @param {BaseStorage} storage
     */
    constructor(storage) {
        super()

        this._storage = storage
        this._callbacks = {}
    }

    /**
     * @param {object} msg
     * @param {Worker} worker
     */
    handleMessageFromWorkers(msg, worker) {
        msg = Message.deserialize(msg)

        if (msg instanceof GetMessage) {
            this._storage.get(msg.storage, msg.key)
                .then(data => {
                    worker.send(Message.response(data, msg.id).serialize())
                })
        }

        if (msg instanceof SetMessage) {
            this._storage.set(msg.storage, msg.key, msg.value)
                .then(() => {
                    worker.send(Message.response(null, msg.id).serialize())
                })
        }

        if (msg instanceof RemoveMessage) {
            this._storage.remove(msg.storage, msg.key)
                .then(() => {
                    worker.send(Message.response(null, msg.id).serialize())
                })
        }
    }

    /**
     * @param {object} msg
     */
    handleMessageFromMaster(msg) {
        msg = Message.deserialize(msg)

        if (msg instanceof ResponseMessage) {
            this._callbacks[msg.id](msg.data)
        }
    }

    /**
     *
     * @param {string} storage
     * @param {string} key
     * @returns {Promise<Object>}
     */
    get(storage, key) {
        return new Promise(resolve => {
            let id = this._genId()

            this._callbacks[id] = resolve

            process.send(Message.get(storage, key, id).serialize())
        })
    }

    /**
     *
     * @param {string} storage
     * @param {key} key
     * @param {Object} data
     * @returns {Promise<>}
     */
    set(storage, key, data) {
        return new Promise(resolve => {
            let id = this._genId()

            this._callbacks[id] = resolve

            process.send(Message.set(storage, key, data, id).serialize())
        })
    }

    /**
     *
     * @param {string} storage
     * @param {string} key
     */
    remove(storage, key) {
        return new Promise(resolve => {
            let id = this._genId()

            this._callbacks[id] = resolve

            process.send(Message.remove(storage, key, id).serialize())
        })
    }

    /**
     * @returns {string}
     * @private
     */
    _genId() {
        return Math.random().toString(36).substring(7)
    }
}

module.exports = SharedStorage