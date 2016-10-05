'use strict'

class CallbackGame {
    //placeholder

    /**
     *
     * @param {Object} raw
     * @returns {CallbackGame}
     */
    static deserialize(raw) {
        return new CallbackGame()
    }

    /**
     *
     * @returns {Object}
     */
    serialize() {
        return {}
    }

    /**
     *
     * @returns {string}
     */
    toJSON() {
        return this.serialize()
    }
}

module.exports = CallbackGame