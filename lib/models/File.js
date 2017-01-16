'use strict'

/**
 * This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile.
 */

class File {
   /**
    *
    * @param {string} fileId
    * @param {number|null} [fileSize]
    * @param {string|null} [filePath]
   */
   constructor(fileId, fileSize, filePath) {
       this._fileId = fileId
       this._fileSize = fileSize
       this._filePath = filePath
   }

   /**
    * Unique identifier for this file
    * @returns {string}
   */
   get fileId() {
       return this._fileId
   }

   /**
    * File size, if known
    * @returns {number|null}
   */
   get fileSize() {
       return this._fileSize
   }

   /**
    * File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.
    * @returns {string|null}
   */
   get filePath() {
       return this._filePath
   }

   /**
    *
    * @param {Object} raw
    * @returns {File}
    */
   static deserialize(raw) {
      return new File(raw['file_id'], raw['file_size'] ? raw['file_size'] : null, raw['file_path'] ? raw['file_path'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          file_size: this.fileSize ? this.fileSize : undefined, 
          file_path: this.filePath ? this.filePath : undefined
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

module.exports = File