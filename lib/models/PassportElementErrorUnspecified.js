'use strict'

/**
 * Represents an issue in an unspecified place. The error is considered resolved when new data is added.
 */

class PassportElementErrorUnspecified {
   /**
    *
    * @param {string} source
    * @param {string} type
    * @param {string} elementHash
    * @param {string} message
   */
   constructor(source, type, elementHash, message) {
       this._source = source
       this._type = type
       this._elementHash = elementHash
       this._message = message
   }

   /**
    * Error source, must be unspecified
    * @returns {string}
   */
   get source() {
       return this._source
   }

   /**
    * Type of element of the user's Telegram Passport which has the issue
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Base64-encoded element hash
    * @returns {string}
   */
   get elementHash() {
       return this._elementHash
   }

   /**
    * Error message
    * @returns {string}
   */
   get message() {
       return this._message
   }

   /**
    *
    * @param {Object} raw
    * @returns {PassportElementErrorUnspecified}
    */
   static deserialize(raw) {
      return new PassportElementErrorUnspecified(raw['source'], raw['type'], raw['element_hash'], raw['message'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          source: this.source ? this.source : undefined, 
          type: this.type ? this.type : undefined, 
          element_hash: this.elementHash ? this.elementHash : undefined, 
          message: this.message ? this.message : undefined
      }
   }

   /**
    *
    * @returns {string}
    */
   toJSON() {
      return this.serialize()
   }
}

module.exports = PassportElementErrorUnspecified