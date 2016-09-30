'use strict'

/**
 * Represents some abstract storage
 * you must extend BaseStorage and override all methods to create your own storage
 */
class BaseStorage {
    /**
     * @param {string} storage
     * @param {string} key
     * @returns {Promise<Object>}
     */
    get(storage, key) { throw 'Not implemented' }

    /**
     * @param {string} storage
     * @param {string} key
     * @param {Object} data
     * @returns {Promise<>}
     */
    set(storage, key, data) { throw 'Not implemented' }

    /**
     * @param {string} storage
     * @param {string} key
     * @returns {Promise<>}
     */
    remove(storage, key) { throw 'Not implemented' }
}

module.exports = BaseStorage