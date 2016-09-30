'use strict'

const BaseCommand = require('./BaseCommand')

class CustomFilterCommand extends BaseCommand {
    /**
     * @param {function} filterCallback
     * @param {string} [handler]
     */
    constructor(filterCallback, handler) {
        super()
        this._filterCallback = filterCallback
        this._handler = handler
    }

    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        console.log(this._filterCallback)
        return this._filterCallback(scope)
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return this._handler
    }
}

module.exports = CustomFilterCommand