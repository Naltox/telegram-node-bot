'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents a sticker.
 */

class Sticker {
   /**
    *
    * @param {string} fileId
    * @param {number} width
    * @param {number} height
    * @param {PhotoSize|null} [thumb]
    * @param {string|null} [emoji]
    * @param {number|null} [fileSize]
   */
   constructor(fileId, width, height, thumb, emoji, fileSize) {
       this._fileId = fileId
       this._width = width
       this._height = height
       this._thumb = thumb
       this._emoji = emoji
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
    * Sticker width
    * @returns {number}
   */
   get width() {
       return this._width
   }

   /**
    * Sticker height
    * @returns {number}
   */
   get height() {
       return this._height
   }

   /**
    * Sticker thumbnail in .webp or .jpg format
    * @returns {PhotoSize|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    * Emoji associated with the sticker
    * @returns {string|null}
   */
   get emoji() {
       return this._emoji
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
    * @returns {Sticker}
    */
   static deserialize(raw) {
      return new Sticker(
          raw['file_id'], 
          raw['width'], 
          raw['height'], 
          raw['thumb'] ? PhotoSize.deserialize(raw['thumb']) : null, 
          raw['emoji'] ? raw['emoji'] : null, 
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
          width: this.width ? this.width : undefined, 
          height: this.height ? this.height : undefined, 
          thumb: this.thumb ? this.thumb.serialize() : undefined, 
          emoji: this.emoji ? this.emoji : undefined, 
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

module.exports = Sticker