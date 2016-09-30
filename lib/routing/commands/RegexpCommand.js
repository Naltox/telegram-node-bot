'use strict'

const BaseCommand = require('./BaseCommand')

class RegexpCommand extends BaseCommand {
    /**
     * @param {RegExp} regexp
     * @param {string} [handler]
     */
    constructor(regexp, handler) {
        super()
        this._regexp = regexp
        this._handler = handler
    }

    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        return scope.message.text && this._regexp.test(scope.message.text)
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return this._handler
    }
}

module.exports = RegexpCommand