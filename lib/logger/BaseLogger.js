'use strict'

/**
 * Represents any logger class 
 * 
 * if you want to create your own logger, you must extend BaseLogger 
 * and override all methods
 */
class BaseLogger {
    /**
     * Any log
     * 
     * @param {Object} data
     */
    log(data) { throw 'Not implemented' }

    /**
     * Warning log
     * 
     * @param {Object} data
     */
    warn(data) { throw 'Not implemented' }

    /**
     * Error log
     * 
     * @param {Object} data
     */
    error(data) { throw 'Not implemented' }
}

module.exports = BaseLogger