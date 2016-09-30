'use strict'

class BaseUpdateFetcher {
    /**
     * @param {TelegramApi} api
     * @param {BaseLogger} logger
     */
    constructor(api, logger) {
        this._api = api
        this._logger = logger
    }

    /**
     * @callback fetchUpdatesCallback
     * @param {Update[]} updates
     */

    /**
     * @param {fetchUpdatesCallback} callback
     */
    fetch(callback) { throw 'Not implemented' }
}

module.exports = BaseUpdateFetcher