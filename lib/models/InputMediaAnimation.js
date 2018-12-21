'use strict'

/**
 * Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent.
 */

class InputMediaAnimation {
   /**
    *
    * @param {string} type
    * @param {string} media
    * @param {string|null} [thumb]
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {number|null} [width]
    * @param {number|null} [height]
    * @param {number|null} [duration]
   */
   constructor(
     type, 
     media, 
     thumb, 
     caption, 
     parseMode, 
     width, 
     height, 
     duration
   ) {
       this._type = type
       this._media = media
       this._thumb = thumb
       this._caption = caption
       this._parseMode = parseMode
       this._width = width
       this._height = height
       this._duration = duration
   }

   /**
    * Type of the result, must be animation
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
    * Caption of the animation to be sent, 0-1024 characters
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
    * Animation width
    * @returns {number|null}
   */
   get width() {
       return this._width
   }

   /**
    * Animation height
    * @returns {number|null}
   */
   get height() {
       return this._height
   }

   /**
    * Animation duration
    * @returns {number|null}
   */
   get duration() {
       return this._duration
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputMediaAnimation}
    */
   static deserialize(raw) {
      return new InputMediaAnimation(
          raw['type'], 
          raw['media'], 
          raw['thumb'] ? raw['thumb'] : null, 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null, 
          raw['width'] ? raw['width'] : null, 
          raw['height'] ? raw['height'] : null, 
          raw['duration'] ? raw['duration'] : null
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
          width: this.width ? this.width : undefined, 
          height: this.height ? this.height : undefined, 
          duration: this.duration ? this.duration : undefined
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

module.exports = InputMediaAnimation