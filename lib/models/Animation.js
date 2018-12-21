'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 */

class Animation {
   /**
    *
    * @param {string} fileId
    * @param {number} width
    * @param {number} height
    * @param {number} duration
    * @param {PhotoSize|null} [thumb]
    * @param {string|null} [fileName]
    * @param {string|null} [mimeType]
    * @param {number|null} [fileSize]
   */
   constructor(
     fileId, 
     width, 
     height, 
     duration, 
     thumb, 
     fileName, 
     mimeType, 
     fileSize
   ) {
       this._fileId = fileId
       this._width = width
       this._height = height
       this._duration = duration
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
    * Video width as defined by sender
    * @returns {number}
   */
   get width() {
       return this._width
   }

   /**
    * Video height as defined by sender
    * @returns {number}
   */
   get height() {
       return this._height
   }

   /**
    * Duration of the video in seconds as defined by sender
    * @returns {number}
   */
   get duration() {
       return this._duration
   }

   /**
    * Animation thumbnail as defined by sender
    * @returns {PhotoSize|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    * Original animation filename as defined by sender
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
    * @returns {Animation}
    */
   static deserialize(raw) {
      return new Animation(
          raw['file_id'], 
          raw['width'], 
          raw['height'], 
          raw['duration'], 
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
          width: this.width ? this.width : undefined, 
          height: this.height ? this.height : undefined, 
          duration: this.duration ? this.duration : undefined, 
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

module.exports = Animation