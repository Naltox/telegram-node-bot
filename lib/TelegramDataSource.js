'use strict'

const BaseTelegramDataSource = require('./BaseTelegramDataSource')

class TelegramDataSource extends BaseTelegramDataSource {
    /**
     *
     * @param {TelegramApi} api
     * @param {TelegramRouter} router
     * @param {BaseLogger} logger
     * @param {TelegramSessionStorage} sessionStorage
     * @param {Ivan} localization
     * @param {TelegramIPC} ipc
     */
    constructor(api, router, logger, sessionStorage, localization, ipc) {
        super()
        
        this._api = api
        this._router = router
        this._logger = logger
        this._scopeExtensions = []
        this._sessionStorage = sessionStorage
        this._localization = localization
        this._ipc = ipc
    }

    /**
     *
     * @returns {TelegramApi}
     */
    get api() {
        return this._api
    }

    /**
     *
     * @returns {TelegramRouter}
     */
    get router() {
        return this._router
    }

    /**
     *
     * @returns {BaseLogger}
     */
    get logger() {
        return this._logger
    }

    /**
     *
     * @returns {BaseScopeExtension[]}
     */
    get scopeExtensions() {
        return this._scopeExtensions
    }

    /**
     *
     * @returns {TelegramSessionStorage}
     */
    get sessionStorage() {
        return this._sessionStorage
    }

    /**
     *
     * @returns {Ivan}
     */
    get localization() {
        return this._localization
    }

    /**
     * @returns {TelegramIPC}
     */
    get ipc() {
        return this._ipc
    }

    /**
     *
     * @param {BaseScopeExtension|BaseScopeExtension[]} extension
     */
    addScopeExtension(extension) {
        if (Array.isArray(extension)) {
            extension.forEach(this._scopeExtensions.push)

            return
        }

        this._scopeExtensions.push(extension)
    }
}

module.exports = TelegramDataSource