'use strict'

const BaseCommand = require('./BaseCommand')

class AnyCommand {
    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        return true
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return 'handle'
    }
}

module.exports = AnyCommand