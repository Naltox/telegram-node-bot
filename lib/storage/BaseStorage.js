'use strict'

/**
 * Represents some abstract storage
 * you must extend BaseStorage and override all methods to create your own storage
 */
class BaseStorage {
    /**
     *
     * @param {string} storage
     * @param {string} key
     * @returns {Promise<Object>}
     */
    get(storage, key) { throw 'Not implemented' }

    /**
     *
     * @param {string} storage
     * @param {key} key
     * @param {Object} data
     */
    set(storage, key, data) { throw 'Not implemented' }

    /**
     *
     * @param {string} storage
     * @param {string} key
     */
    remove(storage, key) { throw 'Not implemented' }
}

module.exports = BaseStorage