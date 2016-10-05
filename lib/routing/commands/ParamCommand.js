'use strict'

const BaseCommand = require('./BaseCommand')

class ParamCommand extends BaseCommand {

    /**
     *
     * @param {string} textPattern
     * @param {string} [handler]
     * @param {Array}  ...arguments the arguments passed to parameter
     */
    constructor(command, handler, ...params) {
        super()

        this._command = command
        this._handler = handler
        this._params  = params
    }

    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {

        if(scope.message.text){

            var split = scope.message.text.split(" ")

            if(split[0] == this._command){ //command matching

                if(this._params.length == split.length - 1){ //param matching

                    scope.param = {}

                    for(var i=0; i<this._params.length; i++){
                        scope.param[this._params[i]] = split[i+1]
                    }

                    return true
                }
            }
        }

        return false
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return this._handler
    }

}

module.exports = ParamCommand
