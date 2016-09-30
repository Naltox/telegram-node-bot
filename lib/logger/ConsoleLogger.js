'use strict'

const BaseLogger = require('./BaseLogger')

const COLOR_CODES = {
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
}

/**
 * Standard ConsoleLogger, will be used if no logger passed to Telegram
 */
class ConsoleLogger extends BaseLogger {
    /**
     *
     * @param {Object} data
     */
    log(data) {
        this._prepareLog('cyan', 'log', data)
    }

    /**
     *
     * @param {Object} data
     */
    warn(data) {
        this._prepareLog('yellow', 'warn', data)
    }

    /**
     *
     * @param {Object} data
     */
    error(data) {
        this._prepareLog('red', 'error', data)
    }

    /**
     *
     * @param {string} color
     * @param {string} prefix
     * @param {Object} data
     * @private
     */
    _prepareLog(color, prefix, data) {
        Object.keys(data).forEach(key => {
            if (data[key] instanceof Error) {
                data[key] = data[key].stack || data[key]
            }
        })

        console.log(`${COLOR_CODES[color]}[${prefix}]   ${COLOR_CODES.reset}`)
        Object.keys(data).forEach(key => console.log(key, data[key]))
        console.log('\n')
    }
}

module.exports = ConsoleLogger