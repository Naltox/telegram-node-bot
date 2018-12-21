'use strict'

/**
 * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB.
 */

class PassportFile {
   /**
    *
    * @param {string} fileId
    * @param {number} fileSize
    * @param {number} fileDate
   */
   constructor(fileId, fileSize, fileDate) {
       this._fileId = fileId
       this._fileSize = fileSize
       this._fileDate = fileDate
   }

   /**
    * Unique identifier for this file
    * @returns {string}
   */
   get fileId() {
       return this._fileId
   }

   /**
    * File size
    * @returns {number}
   */
   get fileSize() {
       return this._fileSize
   }

   /**
    * Unix time when the file was uploaded
    * @returns {number}
   */
   get fileDate() {
       return this._fileDate
   }

   /**
    *
    * @param {Object} raw
    * @returns {PassportFile}
    */
   static deserialize(raw) {
      return new PassportFile(raw['file_id'], raw['file_size'], raw['file_date'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          file_size: this.fileSize ? this.fileSize : undefined, 
          file_date: this.fileDate ? this.fileDate : undefined
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

module.exports = PassportFile