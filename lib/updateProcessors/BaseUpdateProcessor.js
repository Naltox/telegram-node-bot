'use strict'

class BaseUpdateProcessor {
    /**
     *
     * @param {BaseTelegramDataSource} delegate
     */
    constructor(dataSource) {
        /**
         * @var {BaseTelegramDataSource} this._dataSource
         */
        this._dataSource = dataSource
    }

    /**
     *
     * @param {Update} update
     */
    process(update) { throw 'Not implemented' }

    /**
     *
     * @param {Update} update
     * @returns {boolean}
     */
    supports(update) { throw 'Not implemented' }
}

module.exports = BaseUpdateProcessor