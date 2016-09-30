'use strict'

/**
 * Represents any TelegramController
 * you must extend TelegramBaseController 
 * and override at least the handle method to create controller
 */
class TelegramBaseController {
    constructor() {
        this._api = null
        this._localization = null
    }

    /**
     * This method of your controller will be called to handle command.
     *
     * @param {Scope} scope
     */
    handle(scope) { throw 'Not implemented' }

    /**
     * If you want a specific methods of your controller be called for specific commands,
     * you should return here an plain object where key is a route and value is name of your method.
     * In that case handle method will not be called and scope will be passed to your method.
     * Return example: { '/start': 'startMethod' }
     *
     * @returns {Object}
     */
    get routes() { return {} }

    /**
     * This method will be called before any command handler or handle method.
     * You can modify incoming scope and must return it.
     * Your modified scope will be passed to controller.
     *
     * @param {Scope} scope
     * @returns {Scope}
     */
    before(scope) { return scope }

    /**
     * 
     * @param {TelegramApi} api
     */
    set api(api) {
        this._api = api
    }

    /**
     *
     * @param {Ivan} localization
     */
    set localization(localization) {
        this._localization = localization
    }
}

module.exports = TelegramBaseController