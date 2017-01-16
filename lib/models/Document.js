'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 */

class Document {
   /**
    *
    * @param {string} fileId
    * @param {PhotoSize|null} [thumb]
    * @param {string|null} [fileName]
    * @param {string|null} [mimeType]
    * @param {number|null} [fileSize]
   */
   constructor(fileId, thumb, fileName, mimeType, fileSize) {
       this._fileId = fileId
       this._thumb = thumb
       this._fileName = fileName
       this._mimeType = mimeType
       this._fileSize = fileSize
   }

   /**
    * Unique file identifier
    * @returns {string}
   */
   get fileId() {
       return this._fileId
   }

   /**
    * Document thumbnail as defined by sender
    * @returns {PhotoSize|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    * Original filename as defined by sender
    * @returns {string|null}
   */
   get fileName() {
       return this._fileName
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
    * @returns {Document}
    */
   static deserialize(raw) {
      return new Document(
          raw['file_id'], 
          raw['thumb'] ? PhotoSize.deserialize(raw['thumb']) : null, 
          raw['file_name'] ? raw['file_name'] : null, 
          raw['mime_type'] ? raw['mime_type'] : null, 
          raw['file_size'] ? raw['file_size'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          thumb: this.thumb ? this.thumb.serialize() : undefined, 
          file_name: this.fileName ? this.fileName : undefined, 
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

module.exports = Document