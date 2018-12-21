'use strict'

/**
 * Represents an audio file to be treated as music to be sent.
 */

class InputMediaAudio {
   /**
    *
    * @param {string} type
    * @param {string} media
    * @param {string|null} [thumb]
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {number|null} [duration]
    * @param {string|null} [performer]
    * @param {string|null} [title]
   */
   constructor(
     type, 
     media, 
     thumb, 
     caption, 
     parseMode, 
     duration, 
     performer, 
     title
   ) {
       this._type = type
       this._media = media
       this._thumb = thumb
       this._caption = caption
       this._parseMode = parseMode
       this._duration = duration
       this._performer = performer
       this._title = title
   }

   /**
    * Type of the result, must be audio
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files »
    * @returns {string}
   */
   get media() {
       return this._media
   }

   /**
    * Thumbnail of the file sent. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 90. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
    * @returns {string|null}
   */
   get thumb() {
       return this._thumb
   }

   /**
    * Caption of the audio to be sent, 0-1024 characters
    * @returns {string|null}
   */
   get caption() {
       return this._caption
   }

   /**
    * Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in the media caption.
    * @returns {string|null}
   */
   get parseMode() {
       return this._parseMode
   }

   /**
    * Duration of the audio in seconds
    * @returns {number|null}
   */
   get duration() {
       return this._duration
   }

   /**
    * Performer of the audio
    * @returns {string|null}
   */
   get performer() {
       return this._performer
   }

   /**
    * Title of the audio
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputMediaAudio}
    */
   static deserialize(raw) {
      return new InputMediaAudio(
          raw['type'], 
          raw['media'], 
          raw['thumb'] ? raw['thumb'] : null, 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null, 
          raw['duration'] ? raw['duration'] : null, 
          raw['performer'] ? raw['performer'] : null, 
          raw['title'] ? raw['title'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          media: this.media ? this.media : undefined, 
          thumb: this.thumb ? this.thumb : undefined, 
          caption: this.caption ? this.caption : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined, 
          duration: this.duration ? this.duration : undefined, 
          performer: this.performer ? this.performer : undefined, 
          title: this.title ? this.title : undefined
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

module.exports = InputMediaAudio