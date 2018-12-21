'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents a video file.
 */

class Video {
   /**
    *
    * @param {string} fileId
    * @param {number} width
    * @param {number} height
    * @param {number} duration
    * @param {PhotoSize|null} [thumb]
    * @param {string|null} [mimeType]
    * @param {number|null} [fileSize]
   */
   constructor(
     fileId, 
     width, 
     height, 
     duration, 
     thumb, 
     mimeType, 
     fileSize
   ) {
       this._fileId = fileId
       this._width = width
       this._height = height
       this._duration = duration
       this._thumb = thumb
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
    * Video thumbnail
    * @returns {PhotoSize|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    * Mime type of a file as defined by sender
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
    * @returns {Video}
    */
   static deserialize(raw) {
      return new Video(
          raw['file_id'], 
          raw['width'], 
          raw['height'], 
          raw['duration'], 
          raw['thumb'] ? PhotoSize.deserialize(raw['thumb']) : null, 
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

module.exports = Video