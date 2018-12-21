'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represents an audio file to be treated as music by the Telegram clients.
 */

class Audio {
   /**
    *
    * @param {string} fileId
    * @param {number} duration
    * @param {string|null} [performer]
    * @param {string|null} [title]
    * @param {string|null} [mimeType]
    * @param {number|null} [fileSize]
    * @param {PhotoSize|null} [thumb]
   */
   constructor(
     fileId, 
     duration, 
     performer, 
     title, 
     mimeType, 
     fileSize, 
     thumb
   ) {
       this._fileId = fileId
       this._duration = duration
       this._performer = performer
       this._title = title
       this._mimeType = mimeType
       this._fileSize = fileSize
       this._thumb = thumb
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
    * Performer of the audio as defined by sender or by audio tags
    * @returns {string|null}
   */
   get performer() {
       return this._performer
   }

   /**
    * Title of the audio as defined by sender or by audio tags
    * @returns {string|null}
   */
   get title() {
       return this._title
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
    * Thumbnail of the album cover to which the music file belongs
    * @returns {PhotoSize|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    *
    * @param {Object} raw
    * @returns {Audio}
    */
   static deserialize(raw) {
      return new Audio(
          raw['file_id'], 
          raw['duration'], 
          raw['performer'] ? raw['performer'] : null, 
          raw['title'] ? raw['title'] : null, 
          raw['mime_type'] ? raw['mime_type'] : null, 
          raw['file_size'] ? raw['file_size'] : null, 
          raw['thumb'] ? PhotoSize.deserialize(raw['thumb']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          file_id: this.fileId ? this.fileId : undefined, 
          duration: this.duration ? this.duration : undefined, 
          performer: this.performer ? this.performer : undefined, 
          title: this.title ? this.title : undefined, 
          mime_type: this.mimeType ? this.mimeType : undefined, 
          file_size: this.fileSize ? this.fileSize : undefined, 
          thumb: this.thumb ? this.thumb.serialize() : undefined
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

module.exports = Audio