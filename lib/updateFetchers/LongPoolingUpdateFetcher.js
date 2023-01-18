'use strict'

const BaseUpdateFetcher = require('./BaseUpdateFetcher')

class LongPoolingUpdateFetcher extends BaseUpdateFetcher {
    /**
     * @param {TelegramApi} api
     * @param {BaseLogger} logger
     */
    constructor(api, logger) {
        super(api, logger)

        this._callback = null
    }

    /**
     * @callback fetchUpdatesCallback
     * @param {Update[]} updates
     */

    /**
     * @param {fetchUpdatesCallback} callback
     */
    fetch(callback) {
        this._callback = callback
        this._api.setWebhook({ url: '' })
        this._getUpdates()
    }

    /**
     * @param {number} [offset]
     * @private
     */
    _getUpdates(offset) {
        offset = offset || 0

        this._api.getUpdates({ timeout: 50, offset })
            .then(updates => {
                if (updates.length > 0)
                    this._callback(updates)

                const nextOffset = updates.length > 0 ? updates[updates.length - 1].updateId + 1 : offset

                this._getUpdates(nextOffset)
            })
            .catch(error => {
                this._logger.error({ fetchUpdate: error })
                this._getUpdates()
            })
    }
}

module.exports = LongPoolingUpdateFetcher