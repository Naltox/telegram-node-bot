'use strict'

const TelegramApi = require('./api/TelegramApi')
const TelegramRouter = require('./routing/TelegramRouter')
const ConsoleLogger = require('./logger/ConsoleLogger')
const TelegramDataSource = require('./TelegramDataSource')
const UpdateProcessorsManager = require('./updateProcessors/UpdateProcessorsManager')
const InMemoryStorage = require('./storage/session/InMemoryStorage')
const TelegramSessionStorage = require('./storage/session/TelegramSessionStorage')
const TelegramBaseController = require('./mvc/TelegramBaseController')
const TelegramBaseCallbackQueryController = require('./mvc/TelegramBaseCallbackQueryController')
const TelegramBaseInlineQueryController = require('./mvc/TelegramBaseInlineQueryController')
const Models = require('./models/Models')
const Ivan = require('./localization/Ivan')
const Scope = require('./mvc/Scope')
const InputFile = require('./api/InputFile')
const InlineScope = require('./mvc/InlineScope')
const BaseStorage = require('./storage/BaseStorage')
const BaseLogger = require('./logger/BaseLogger')
const BaseScopeExtension = require('./mvc/BaseScopeExtension')
const BaseUpdateProcessor = require('./updateProcessors/BaseUpdateProcessor')

class Telegram {
    /**
     *
     * @param {string} token
     * @param {BaseLogger} [logger]
     * @param {BaseStorage} [storage]
     * @param {Object[]} [localization]
     */
    constructor(token, logger, storage, localization) {
        if (!logger) logger = new ConsoleLogger()
        if (!storage) storage = new InMemoryStorage()

        let ivan
        if (!localization) {
            ivan = new Ivan(storage, [])
        }
        else {
            ivan = new Ivan(storage, localization)
        }



        this._telegramDataSource = new TelegramDataSource(
            new TelegramApi(token, logger),
            new TelegramRouter(),
            logger,
            new TelegramSessionStorage(storage),
            ivan
        )

        /**
         *
         * @type {beforeHandler}
         * @private
         */
        this._beforeUpdateFunction = null

        this._updateProcessor = new UpdateProcessorsManager(this._telegramDataSource)

        this._getUpdates((updates) => {
            updates.forEach(update => {
                if (!this._beforeUpdateFunction) {
                    this._updateProcessor.process(update)
                    return
                }

                this._beforeUpdateFunction(update, handle => {
                    if (handle === true) {
                        this._updateProcessor.process(update)
                    }
                })
            })
        })
    }

    /**
     * Pass child of BaseScopeExtension or array of children to use that extensions
     *
     * @param {BaseScopeExtension|BaseScopeExtension[]} extension
     */
    addScopeExtension(extension) {
        this._telegramDataSource.addScopeExtension(extension)
    }

    /**
     *
     * @returns {TelegramApi}
     */
    get api() {
        return this._telegramDataSource.api
    }

    /**
     *
     * @returns {TelegramRouter}
     */
    get router() {
        return this._telegramDataSource.router
    }

    /**
     *
     * @returns {BaseLogger}
     */
    get logger() {
        return this._telegramDataSource.logger
    }

    /**
     *
     * @returns {TelegramSessionStorage}
     */
    get sessionStorage() {
        return this._telegramDataSource.sessionStorage
    }

    /**
     * @callback continueCallback
     * @param {boolean} handle
     */

    /**
     * @callback beforeHandler
     * @param {Update} update
     * @param {continueCallback} callback
     */

    /**
     * Your handler function passed to this method will be called after getting
     * any update, but before it's processing.
     *
     * Also to your function will be passed callback function,
     * if you call that function with 'true' argument, then update handling will be continued,
     * else the update will not be handled.
     *
     * @param {beforeHandler} handler
     */
    before(handler) {
        this._beforeUpdateFunction = handler
    }

    /**
     *
     * @param {Function} callback
     * @param {number} offset
     * @private
     */
    _getUpdates(callback, offset) {
        offset = offset || 0

        this.api.getUpdates({ timeout: 50,  offset: offset })
            .then(updates => {
                callback(updates)
                const nextOffset = updates.length > 0 ? updates[updates.length - 1].updateId + 1 : offset

                this._getUpdates(callback, nextOffset)
            })
            .catch(error => {
                this._logger.error({ fetchUpdate: error })
                this._getUpdates(callback)
            })
    }
}

module.exports = {
    Telegram,
    TelegramBaseController,
    TelegramBaseCallbackQueryController,
    TelegramBaseInlineQueryController,
    Scope,
    BaseLogger,
    BaseScopeExtension,
    InputFile,
    InlineScope,
    BaseStorage,
    Models
}
