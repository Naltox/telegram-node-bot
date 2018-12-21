'use strict'

/**
 * Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change.
 */

class PassportElementErrorTranslationFiles {
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
    * Error source, must be translation_files
    * @returns {string}
   */
   get source() {
       return this._source
   }

   /**
    * Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”
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
    * @returns {PassportElementErrorTranslationFiles}
    */
   static deserialize(raw) {
      return new PassportElementErrorTranslationFiles(raw['source'], raw['type'], raw['file_hashes'], raw['message'])
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

module.exports = PassportElementErrorTranslationFiles