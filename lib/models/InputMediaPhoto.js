'use strict'

/**
 * Represents a photo to be sent.
 */

class InputMediaPhoto {
   /**
    *
    * @param {string} type
    * @param {string} media
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
   */
   constructor(type, media, caption, parseMode) {
       this._type = type
       this._media = media
       this._caption = caption
       this._parseMode = parseMode
   }

   /**
    * Type of the result, must be photo
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
    * Caption of the photo to be sent, 0-1024 characters
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
    *
    * @param {Object} raw
    * @returns {InputMediaPhoto}
    */
   static deserialize(raw) {
      return new InputMediaPhoto(raw['type'], raw['media'], raw['caption'] ? raw['caption'] : null, raw['parse_mode'] ? raw['parse_mode'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          media: this.media ? this.media : undefined, 
          caption: this.caption ? this.caption : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined
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

module.exports = InputMediaPhoto