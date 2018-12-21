'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 */

class VideoNote {
   /**
    *
    * @param {string} fileId
    * @param {number} length
    * @param {number} duration
    * @param {PhotoSize|null} [thumb]
    * @param {number|null} [fileSize]
   */
   constructor(fileId, length, duration, thumb, fileSize) {
       this._fileId = fileId
       this._length = length
       this._duration = duration
       this._thumb = thumb
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
    * Video width and height (diameter of the video message) as defined by sender
    * @returns {number}
   */
   get length() {
       return this._length
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
    * File size
    * @returns {number|null}
   */
   get fileSize() {
       return this._fileSize
   }

   /**
    *
    * @param {Object} raw
    * @returns {VideoNote}
    */
   static deserialize(raw) {
      return new VideoNote(
          raw['file_id'], 
          raw['length'], 
          raw['duration'], 
          raw['thumb'] ? PhotoSize.deserialize(raw['thumb']) : null, 
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
          length: this.length ? this.length : undefined, 
          duration: this.duration ? this.duration : undefined, 
          thumb: this.thumb ? this.thumb.serialize() : undefined, 
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

module.exports = VideoNote