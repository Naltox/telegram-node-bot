'use strict'

/**
 * This object represents a voice note.
 */

class Voice {
   /**
    *
    * @param {string} fileId
    * @param {number} duration
    * @param {string|null} [mimeType]
    * @param {number|null} [fileSize]
   */
   constructor(fileId, duration, mimeType, fileSize) {
       this._fileId = fileId
       this._duration = duration
       this._mimeType = mimeType
       this._fileSize = fileSize
   }

   /**
    * Unique identifier for this file
    * @returns {string}
   */
   get fileId() {
       return this._fileId
   }

   /**
    * Duration of the audio in seconds as defined by sender
    * @returns {number}
   */
   get duration() {
       return this._duration
   }

   /**
    * MIME type of the file as defined by sender
    * @returns {string|null}
   */
   get mimeType() {
       return this._mimeType
   }

   /**
    * File size
    * @returns {number|null}
   */
   get fileSize() {
       return this._fileSize
   }

   /**
    *
    * @param {Object} raw
    * @returns {Voice}
    */
   static deserialize(raw) {
      return new Voice(raw['file_id'], raw['duration'], raw['mime_type'] ? raw['mime_type'] : null, raw['file_size'] ? raw['file_size'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          duration: this.duration ? this.duration : undefined, 
          mime_type: this.mimeType ? this.mimeType : undefined, 
          file_size: this.fileSize ? this.fileSize : undefined
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

module.exports = Voice