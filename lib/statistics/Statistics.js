'use strict'

class Statistics {
    constructor() {
        this._requestsCount = 0
        this._workersRequests = {}
        this._workers = {}
    }

    /**
     * @param {number} workerPid
     */
    registrateRequest(workerPid) {
        this._requestsCount++

        if (!this._workersRequests[workerPid])
            this._workersRequests[workerPid] = 1
        else
            this._workersRequests[workerPid] += 1
    }

    /**
     * @returns {number}
     */
    getTotalRequestsCount() {
        return this._requestsCount
    }

    /**
     * @returns {{}}
     */
    getWorkersRequests() {
        return this._workersRequests
    }

    /**
     * @returns {string}
     */
    getUptime() {
        return this._secondsToHms(process.uptime())
    }

    /**
     * @returns {{}}
     */
    getWorkersStatus() {
        return this._workers    
    }

    /**
     * @param {number} workerPid
     */
    addWorker(workerPid) {
        this._workers[workerPid] = {
            status: 'live'
        }
    }

    /**
     * @param {number} workerPid
     */
    workerDied(workerPid) {
        this._workers[workerPid] = {
            status: 'died'
        }
    }

    _secondsToHms(d) {
        d = Number(d)
        var h = Math.floor(d / 3600)
        var m = Math.floor(d % 3600 / 60)
        var s = Math.floor(d % 3600 % 60)
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s)
    }
}

module.exports = Statistics