'use strict'

class CallbackQueue {
    /**
     * 
     * @param {number} countPerSec
     */
    constructor(countPerSec){
        this._delay = 1000 / countPerSec
        this._queue = []
        this._queueStarted = false

        this._prepareQueue()
    }

    /**
     * 
     * @param {function} func
     */
    push(func){
        this._queue.push(func)

        if(!this._queueStarted)
            this._prepareQueue()
    }

    /**
     * 
     * @private
     */
    _prepareQueue(){
        if(this._queue.length != 0){
            const func = this._queue.shift()

            setTimeout(() => {
                func()
                this._prepareQueue()
            }, this._queueStarted ? this._delay : 0)

            this._queueStarted = true
            return
        }

        this._queueStarted = false
    }
}

module.exports = CallbackQueue