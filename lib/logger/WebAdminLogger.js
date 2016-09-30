'use strict'

const ConsoleLogger = require('./ConsoleLogger')

class WebAdminLogger extends ConsoleLogger {
    constructor() {
        super()

        this._logs = ''
    }

    /**
     * @returns {string}
     */
    getAllLogs() {
        return this._logs
    }

    /**
     *
     * @param {string} color
     * @param {string} prefix
     * @param {Object} data
     * @private
     */
    _prepareLog(color, prefix, data) {
        super._prepareLog(color, prefix, data)

        Object.keys(data).forEach(key => {
            if (data[key] instanceof Error) {
                data[key] = data[key].stack || data[key]
            }
        })

        this._logs += `${new Date().toString().split(' ')[4]} [${prefix}] - `

        Object.keys(data).forEach(key => {
            if (typeof data[key] == 'object')
                this._logs += `${key} ${JSON.stringify(data[key], null, 2)}`
            else
                this._logs += `${key} ${data[key]}`
        })
        this._logs += '\n'
    }
}

module.exports = WebAdminLogger