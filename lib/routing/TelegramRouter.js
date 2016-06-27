'use strict'

const TelegramRoute = require('./TelegramRoute')

/**
 * Routing class, helps to route updates to controllers
 */
class TelegramRouter {
    constructor() {
        this._routes = []
        this._otherwiseController = null
        this._callbackQueryController = null
        this._inlineQueryController = null
        this._anyController = null
    }

    /**
     * You can pass your command pattern or array of patterns
     * and some child of TelegramBaseController
     *
     * After that any update that satisfies your command
     * will be passed to your controller
     *
     * @param {string[]|string|RegExp|RegExp[]} commands
     * @param {TelegramBaseController} controller
     * @returns {TelegramRouter}
     */
    when(commands, controller) {
        this._routes.push(new TelegramRoute(commands, controller))

        return this
    }

    /**
     * This child of TelegramBaseController will be called for all updates
     *
     * @param {TelegramBaseController} controller
     * @returns {TelegramRouter}
     */
    any(controller) {
        this._anyController = controller
        return this
    }

    /**
     * This child of TelegramBaseController will be called
     * if there is no controller for that update (except controller passed to 'any' method)
     *
     * @param {TelegramBaseController} controller
     * @returns {TelegramRouter}
     */
    otherwise(controller) {
        this._otherwiseController = controller
        return this
    }

    /**
     * This child of TelegramBaseCallbackQueryController will be called for all callback queries
     *
     * @param {TelegramBaseCallbackQueryController} controller
     */
    callbackQuery(controller) {
        this._callbackQueryController = controller
        return this
    }

    /**
     * This child of TelegramBaseCallbackQueryController will be called for all inline queries
     *
     * @param {TelegramBaseInlineQueryController} controller
     * @returns {TelegramRouter}
     */
    inlineQuery(controller) {
        this._inlineQueryController = controller
        return this
    }

    /**
     *
     * @returns {TelegramBaseCallbackQueryController|null}
     */
    get callbackQueryController() {
        return this._callbackQueryController
    }

    /**
     *
     * @returns {TelegramBaseInlineQueryController|null}
     */
    get inlineQueryController() {
        return this._inlineQueryController
    }

    /**
     *
     * @param {Update} update
     * @returns {TelegramBaseController[]}
     */
    controllersForUpdate(update) {
        if (!update.message && !update.editedMessage) return null

        let controllers = []

        if (this._anyController) controllers.push(this._anyController)

        let haveControllerForCommand = false

        for (const route of this._routes) {
            for (const command of route.commands) {
                let test = this._testCommand(command, update.message || update.editedMessage)

                if (test !== false) {
                    if (test === 'otherwise') {
                        break
                    }

                    controllers.push(route.controller)
                    haveControllerForCommand = true

                    break
                }
            }
        }

        if (!haveControllerForCommand && this._otherwiseController) controllers.push(this._otherwiseController)

        return controllers
    }

    /**
     *
     * @param {Update} update
     * @returns {string}
     */
    commandNameForUpdate(update) {
        if (!update.message && !update.editedMessage) return null

        for (const route of this._routes) {
            for (const command of route.commands) {
                if (this._testCommand(command, update.message || update.editedMessage) !== false) {
                    return command.name || command
                }
            }
        }
    }

    /**
     *
     * @param {Update} update
     * @returns {string}
     */
    commandForUpdate(update) {
        if (!update.message && !update.editedMessage) return null

        for (const route of this._routes) {
            for (const command of route.commands) {
                if (this._testCommand(command, update.message || update.editedMessage) !== false) {
                    return command
                }
            }
        }

        if (this._otherwiseController) return 'otherwise'
    }

    /**
     *
     * @param {Update} update
     * @returns {string[]}
     */
    queryForUpdate(update) {
        if (!update.message && !update.editedMessage) return null

        const command = this.commandForUpdate(update)

        if (!command) return null

        const args = this._testCommand(command, update.message || update.editedMessage)

        if (args) return args

        return []
    }

    /**
     * If test fails = returns false,
     * if test passed returns array of command arguments.
     *
     * @param {string|RegExp|Function} command
     * @param {Message} message
     * @returns {boolean|string[]|Object}
     * @private
     */
    _testCommand(command, message) {
        if (typeof command === 'string' && message.text) {
            let haveQuery = true

            const mask = command.split(' ')
            const query = message.text.split(' ')

            let result = {}

            if (mask.length === query.length) {
                for (var i = 0; i < query.length; i++) {
                    switch (mask[i][0]) {
                        case '/':
                            if (mask[i] !== query[i]) haveQuery = false
                            result.command = query[i]
                            break
                        case ':':
                            result[mask[i].replace(':', '')] = query[i]
                    }
                }
            }

            if (!result.command) haveQuery = false

            if (result && haveQuery) return result

            if (message.text.indexOf(command) > -1 && !haveQuery) return message.text.replace(command, '')

            return false
        }

        if (command instanceof RegExp && message.text) {
            if (command.test(message.text)) {
                let query = []
                var arg

                command.lastIndex = 0 //reset regexp
                while (arg = command.exec(message.text)) {
                    query.push(arg[1] || arg[0])
                }

                return query
            }

            return false
        }

        if (command.name && command.test) {
            return command.test(message)
        }

        if (this._otherwiseController) return 'otherwise'
    }
}

module.exports = TelegramRouter