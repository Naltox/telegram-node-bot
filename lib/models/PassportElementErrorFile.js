'use strict'

/**
 * Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes.
 */

class PassportElementErrorFile {
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
    * Error source, must be file
    * @returns {string}
   */
   get source() {
       return this._source
   }

   /**
    * The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Base64-encoded file hash
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
    * @returns {PassportElementErrorFile}
    */
   static deserialize(raw) {
      return new PassportElementErrorFile(raw['source'], raw['type'], raw['file_hash'], raw['message'])
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

module.exports = PassportElementErrorFile