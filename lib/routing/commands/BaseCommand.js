'use strict'

class BaseCommand {
    /**
     * Tests message
     *
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        throw 'Not implemented'
    }

    /**
     * Returns handler method name in controller
     *
     * @returns {string}
     */
    get handlerName() { throw 'Not implemented' }
}


module.exports = BaseCommand