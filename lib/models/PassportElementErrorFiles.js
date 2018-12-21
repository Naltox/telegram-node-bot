'use strict'

/**
 * Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes.
 */

class PassportElementErrorFiles {
   /**
    *
    * @param {string} source
    * @param {string} type
    * @param {string[]} fileHashes
    * @param {string} message
   */
   constructor(source, type, fileHashes, message) {
       this._source = source
       this._type = type
       this._fileHashes = fileHashes
       this._message = message
   }

   /**
    * Error source, must be files
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
    * List of base64-encoded file hashes
    * @returns {string[]}
   */
   get fileHashes() {
       return this._fileHashes
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
    * @returns {PassportElementErrorFiles}
    */
   static deserialize(raw) {
      return new PassportElementErrorFiles(raw['source'], raw['type'], raw['file_hashes'], raw['message'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          source: this.source ? this.source : undefined, 
          type: this.type ? this.type : undefined, 
          file_hashes: this.fileHashes ? this.fileHashes : undefined, 
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

module.exports = PassportElementErrorFiles