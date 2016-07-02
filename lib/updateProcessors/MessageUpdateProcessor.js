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
        if (update.message) {
            let message = update.message

            this._getSession(message)
                .then(session => {
                    let scope = new Scope(
                        update,
                        this._dataSource.router.queryForUpdate(update),
                        this._dataSource.api,
                        this._dataSource.scopeExtensions,
                        this._waitingRequests,
                        this._waitingCallbackQueries,
                        session.chatSession,
                        session.userSession
                    )

                    const chatId = message.chat.id

                    if (this._waitingRequests[chatId] && this._waitingRequests[chatId] !== null) {
                        const callback = this ._waitingRequests[chatId]
                        callback(scope)

                        if (this._waitingRequests[chatId] == callback) this._waitingRequests[chatId] = null
                        scope = null

                        return
                    }

                    const controllers = this._dataSource.router.controllersForUpdate(update)

                    controllers.forEach(controller => {
                        if (controller) {
                            controller.api = this._dataSource.api
                            controller.localization = this._dataSource.localization

                            try {
                                const command = this._dataSource.router.commandNameForUpdate(update)

                                controller.methodForCommand(command)(controller.before(command, scope))
                            }
                            catch (e) {
                                this._dataSource.logger.error({
                                    'error': e,
                                    'in controller': controller,
                                    'for update': update
                                })
                            }
                        }
                    })

                    if (controllers.length === 0) {
                        this._dataSource.logger.warn({
                            'Cant find controller for update': update
                        })
                    }

                    scope = null
                })
                .catch(e => {
                    this._dataSource.logger.error({
                        'error': e.stack || e,
                        'for update': update
                    })
                })

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
     *
     * @param {Message} message
     * @returns {Promise<TelegramSession>}
     * @private
     */
    _getSession(message) {
        let chatSession, userSession

        return this._dataSource.sessionStorage.getChatSession(message.chat.id)
            .then(_chatSession => {
                chatSession = _chatSession

                return message.from ? this._dataSource.sessionStorage.getUserSession(message.from.id) : null
            })
            .then(_userSession => {
                userSession = _userSession

                //Handlers for listening to any change in session
                const chatSessionHandler = {
                    set: (target, key, value, receiver) => {
                        Reflect.set(target, key, value, receiver)

                        this._dataSource.sessionStorage.setChatSession(
                            message.chat.id,
                            target
                        )

                        return true
                    }
                }
                const userSessionHandler = {
                    set: (target, key, value, receiver) => {
                        if (message.from) {
                            Reflect.set(target, key, value, receiver)

                            this._dataSource.sessionStorage.setUserSession(
                                message.from.id,
                                target
                            )
                        }

                        return true
                    }
                }

                const listenableChatSession = new Proxy(chatSession, chatSessionHandler)
                const listenableUserSession = userSession ? new Proxy(userSession, userSessionHandler) : null

                return new TelegramSession(listenableUserSession, listenableChatSession)
            })
    }
}

module.exports = MessageUpdateProcessor