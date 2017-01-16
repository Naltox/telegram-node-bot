'use strict'

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 */

class PhotoSize {
   /**
    *
    * @param {string} fileId
    * @param {number} width
    * @param {number} height
    * @param {number|null} [fileSize]
   */
   constructor(fileId, width, height, fileSize) {
       this._fileId = fileId
       this._width = width
       this._height = height
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
    * Photo width
    * @returns {number}
   */
   get width() {
       return this._width
   }

   /**
    * Photo height
    * @returns {number}
   */
   get height() {
       return this._height
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
    * @returns {PhotoSize}
    */
   static deserialize(raw) {
      return new PhotoSize(raw['file_id'], raw['width'], raw['height'], raw['file_size'] ? raw['file_size'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          width: this.width ? this.width : undefined, 
          height: this.height ? this.height : undefined, 
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

module.exports = PhotoSize