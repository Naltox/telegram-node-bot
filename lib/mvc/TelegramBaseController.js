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
     * @param {string} command
     * @param {Scope} scope
     * @returns {Scope}
     */
    before(command, scope) { return scope }

    /**
     *
     * @param {string} command
     * @returns {Function}
     */
    methodForCommand(command) {
        // Check if .when() or .otherwise() called
        if(typeof command !== 'undefined') { // .when()
            for (const route in this.routes) {
                if (command instanceof RegExp) {
                    //because Regexp.toString changes the original Regexp :(
                    const match = route.match(new RegExp('^/(.*?)/([gimy]*)$'))

                    if (match) {
                        const regex = new RegExp(match[1], match[2])
                        if (regex.toString() == command.toString()) return this[this.routes[route]].bind(this)
                    }
                }

                if (route === command.toString()) {
                    return this[this.routes[route]].bind(this)
                }
            }
        }
        // .otherwise() called, that's why command not provided

        return this.handle.bind(this)
    }

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