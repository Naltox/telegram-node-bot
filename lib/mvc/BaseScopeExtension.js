'use strict'

/**
 * Represents any scope extension
 * 
 * if you want to create your own scope extension, 
 * you must extend BaseScopeExtension 
 * and override all methods
 */
class BaseScopeExtension {
    /**
     * 
     * @param {Scope} scope
     */
    constructor(scope) { }

    /**
     * This method will be called by your extension user ( $.yourExtension(args...) )
     * @param {...*}
     */
    process() { throw 'Not implemented' }

    /**
     * You should return your extension name here. That name will be in scope. ( $.yourExtensionName )
     * @returns {string}
     */
    get name() { throw 'Not implemented' }
}

module.exports = BaseScopeExtension