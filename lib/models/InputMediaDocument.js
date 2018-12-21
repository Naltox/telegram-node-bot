'use strict'

/**
 * Represents a general file to be sent.
 */

class InputMediaDocument {
   /**
    *
    * @param {string} type
    * @param {string} media
    * @param {string|null} [thumb]
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
   */
   constructor(type, media, thumb, caption, parseMode) {
       this._type = type
       this._media = media
       this._thumb = thumb
       this._caption = caption
       this._parseMode = parseMode
   }

   /**
    * Type of the result, must be document
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
    * Caption of the document to be sent, 0-1024 characters
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
    * @returns {InputMediaDocument}
    */
   static deserialize(raw) {
      return new InputMediaDocument(
          raw['type'], 
          raw['media'], 
          raw['thumb'] ? raw['thumb'] : null, 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null
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

module.exports = InputMediaDocument