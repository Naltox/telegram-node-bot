'use strict'

class UpdateProcessorDelegate { //Delegate in js, LOL :D
    /**
     * @returns {TelegramApi}
     */
    get api() { throw 'Not implemented' }

    /**
     * @returns {TelegramRouter}
     */
    get router() { throw 'Not implemented' }

    /**
     * @returns {BaseLogger}
     */
    get logger() { throw 'Not implemented' }

    /**
     * @returns {BaseScopeExtension[]}
     */
    get scopeExtensions() { throw 'Not implemented' }

    /**
     * @returns {TelegramSessionStorage}
     */
    get sessionStorage() { throw 'Not implemented' }
}

module.exports = UpdateProcessorDelegate