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
const http = require('http')

class Telegram {
    /**
     *
     * @param {string} token
     * @param {Object[]} options
     * @param {BaseLogger} [logger]
     * @param {BaseStorage} [storage]
     * @param {Object[]} [localization]
     */
    constructor(token, options = {}, logger, storage, localization) {
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

        // Start webserver if webhook options are provided
        if (options && Object.keys(options.webhook).length) {
            this.api.setWebhook(options.webhook)
                .then((res) => {
                    let binded = this._requestListener.bind(this)
                    this._webServer = http.createServer(binded)
                    this._webServer.listen(options.webhook.port, options.webhook.host, () => {
                        this.logger.log({startServer: `HTTP server started on ${options.webhook.host}:${options.webhook.port}`})
                    })
                })
                .catch((err) => {
                    this.logger.error({startWebServer: err})
                });
        } else {
            // Remove webhook
            this.api.setWebhook({}).then((res) => this.start());
        }
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
     * Start updates receiving
     */
    start() {
        this._getUpdates((updates) => {
            updates.forEach(update => this._processCommand(update))
        })
    }

    /**
     * @param update
     * @private
     */
    _processCommand(update) {
        if (!this._beforeUpdateFunction) {
            this._updateProcessor.process(update)
            return
        }

        this._beforeUpdateFunction(update, handle => {
            if (handle === true) {
                this._updateProcessor.process(update)
            }
        })
    }

    /**
     * @param req
     * @param res
     * @private
     */
    _requestListener(req, res) {
        var regex = new RegExp(this.api._token);

        // If there isn't token on URL
        if (!regex.test(req.url)) {
            this.logger.error({webhook: 'Not authorized'})
            res.statusCode = 401
            res.end();
        } else if (req.method === 'POST') {
            var fullBody = ''
            req.on('data', function (chunk) {
                fullBody += chunk.toString()
            });
            req.on('end', function () {
                try {
                    this._processCommand(JSON.parse(fullBody))
                } catch (error) {
                    this.logger.error({webhook: error})
                }
                res.end('OK');
            }.bind(this));
        } else {
            // Authorized but not a POST
            this.logger.error({webhook: 'Authorized but not a POST'})
            res.statusCode = 418
            res.end()
        }
    };

    /**
     *
     * @param {Function} callback
     * @param {number} offset
     * @private
     */
    _getUpdates(callback, offset) {
        offset = offset || 0

        this.api.getUpdates({timeout: 50, offset: offset})
            .then(updates => {
                callback(updates)
                const nextOffset = updates.length > 0 ? updates[updates.length - 1].updateId + 1 : offset

                this._getUpdates(callback, nextOffset)
            })
            .catch(error => {
                this._logger.error({fetchUpdate: error})
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
