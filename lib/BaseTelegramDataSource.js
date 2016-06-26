'use strict'

class BaseTelegramDataSource {
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

    /**
     * @returns {Ivan}
     */
    get localization() { throw 'Not implemented' }
}

module.exports = BaseTelegramDataSource