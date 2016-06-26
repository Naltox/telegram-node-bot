'use strict'

/**
 * Represents route for router
 */
class TelegramRoute {
    /**
     *
     * @param {string|RegExp|Array<string, RegExp>} commands
     * @param {TelegramBaseController} controller
     */
    constructor(commands, controller) {
        this._commands = Array.isArray(commands) ? commands : [commands]
        this._controller = controller
    }

    /**
     *
     * @returns {string[]}
     */
    get commands() {
        return this._commands
    }

    /**
     *
     * @returns {TelegramBaseController}
     */
    get controller() {
        return this._controller
    }
}

module.exports = TelegramRoute