'use strict'

const BaseUpdateProcessor = require('./BaseUpdateProcessor')
const Scope = require('../mvc/Scope')
const TelegramSession = require('../storage/session/TelegramSession')

class MessageUpdateProcessor extends BaseUpdateProcessor {
    /**
     *
     * @param {BaseTelegramDataSource} dataSource
     */
    constructor(dataSource) {
        super(dataSource)

        this._waitingRequests = {}
        this._waitingCallbackQueries = {}
    }

    /**
     *
     * @param {Update} update
     */
    process(update) {
        if (update.message || update.editedMessage) {
            let message = update.message || update.editedMessage

            let scope = new Scope(
                update,
                this._dataSource.api,
                this._dataSource.scopeExtensions,
                this._waitingRequests,
                this._waitingCallbackQueries,
                this._dataSource.logger,
                this._dataSource.sessionStorage,
                chatId => this._waitForUpdate(chatId),
                data => this._waitForCallback(data)
            )

            const chatId = message.chat.id

            if (this._waitingRequests[chatId] && this._waitingRequests[chatId] !== null) {
                const callback = this._waitingRequests[chatId]
                callback(scope)

                if (this._waitingRequests[chatId] == callback) this._waitingRequests[chatId] = null
                scope = null

                return
            }
            const controllers = this._dataSource.router.controllersForScope(scope)

            controllers.forEach(controller => {
                controller.controller.api = this._dataSource.api
                controller.controller.localization = this._dataSource.localization

                try {
                    let beforeMiddlewareValue  = controller.controller.before(scope)
                    let controllerHandler      = controller.controller[controller.handler]

                    if (beforeMiddlewareValue === false) {
                        if (typeof controller.controller.rejected !== 'undefined') {
                            controller.controller.rejected(null, scope)
                        }
                    } else if (beforeMiddlewareValue instanceof Promise) {
                        beforeMiddlewareValue
                            .then(scope => controllerHandler(scope))
                            .catch(err => controller.controller.rejected(err, scope))
                    } else {
                        controllerHandler(beforeMiddlewareValue)
                    }
                }
                catch (e) {
                    this._dataSource.logger.error({
                        'error': e,
                        'in controller': controller,
                        'for update': update
                    })
                }
            })

            if (controllers.length === 0) {
                this._dataSource.logger.warn({
                    'Cant find controller for update': update
                })
            }

            //scope = null

            return
        }

        if (update.callbackQuery) {
            if (this._waitingCallbackQueries[update.callbackQuery.data]) {
                this._waitingCallbackQueries[update.callbackQuery.data](update.callbackQuery)

                return
            }

            if (this._dataSource.router.callbackQueryController) {
                try {
                    this._dataSource.router.callbackQueryController.handle(update.callbackQuery)
                }
                catch (e) {
                    this._dataSource.logger.error({
                        'error': e,
                        'in controller': this._dataSource.router.callbackQueryController,
                        'for update': update
                    })
                }
            }

            return
        }

        this._dataSource.logger.warn({ 'Update was not handled': update })
    }

    /**
     *
     * @param {Update} update
     */
    supports(update) {
        return !!(update.message || update.editedMessage || update.callbackQuery)
    }

    /**
     * @param {number} chatId
     * @private
     */
    _waitForUpdate(chatId) {
        this._dataSource.ipc.askForNextUpdate(chatId)
    }

    /**
     * @param {string} data
     * @private
     */
    _waitForCallback(data) {
        this._dataSource.ipc.askForNextCallbackQuery(data)
    }
}

module.exports = MessageUpdateProcessor