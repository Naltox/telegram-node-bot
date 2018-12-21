'use strict'

/**
 * Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes.
 */

class PassportElementErrorFrontSide {
   /**
    *
    * @param {string} source
    * @param {string} type
    * @param {string} fileHash
    * @param {string} message
   */
   constructor(source, type, fileHash, message) {
       this._source = source
       this._type = type
       this._fileHash = fileHash
       this._message = message
   }

   /**
    * Error source, must be front_side
    * @returns {string}
   */
   get source() {
       return this._source
   }

   /**
    * The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Base64-encoded hash of the file with the front side of the document
    * @returns {string}
   */
   get fileHash() {
       return this._fileHash
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
    * @returns {PassportElementErrorFrontSide}
    */
   static deserialize(raw) {
      return new PassportElementErrorFrontSide(raw['source'], raw['type'], raw['file_hash'], raw['message'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          source: this.source ? this.source : undefined, 
          type: this.type ? this.type : undefined, 
          file_hash: this.fileHash ? this.fileHash : undefined, 
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

module.exports = PassportElementErrorFrontSide