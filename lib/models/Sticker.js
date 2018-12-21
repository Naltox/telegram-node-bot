'use strict'

const PhotoSize = require('./PhotoSize')
const MaskPosition = require('./MaskPosition')

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
    * @param {string|null} [setName]
    * @param {MaskPosition|null} [maskPosition]
    * @param {number|null} [fileSize]
   */
   constructor(
     fileId, 
     width, 
     height, 
     thumb, 
     emoji, 
     setName, 
     maskPosition, 
     fileSize
   ) {
       this._fileId = fileId
       this._width = width
       this._height = height
       this._thumb = thumb
       this._emoji = emoji
       this._setName = setName
       this._maskPosition = maskPosition
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
    * Sticker thumbnail in the .webp or .jpg format
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
    * Name of the sticker set to which the sticker belongs
    * @returns {string|null}
   */
   get setName() {
       return this._setName
   }

   /**
    * For mask stickers, the position where the mask should be placed
    * @returns {MaskPosition|null}
   */
   get maskPosition() {
       return this._maskPosition
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
          raw['set_name'] ? raw['set_name'] : null, 
          raw['mask_position'] ? MaskPosition.deserialize(raw['mask_position']) : null, 
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
          set_name: this.setName ? this.setName : undefined, 
          mask_position: this.maskPosition ? this.maskPosition.serialize() : undefined, 
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