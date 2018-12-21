'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 */

class InlineQueryResultMpeg4Gif extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} mpeg4Url
    * @param {number|null} [mpeg4Width]
    * @param {number|null} [mpeg4Height]
    * @param {number|null} [mpeg4Duration]
    * @param {string} thumbUrl
    * @param {string|null} [title]
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     mpeg4Url, 
     mpeg4Width, 
     mpeg4Height, 
     mpeg4Duration, 
     thumbUrl, 
     title, 
     caption, 
     parseMode, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._mpeg4Url = mpeg4Url
       this._mpeg4Width = mpeg4Width
       this._mpeg4Height = mpeg4Height
       this._mpeg4Duration = mpeg4Duration
       this._thumbUrl = thumbUrl
       this._title = title
       this._caption = caption
       this._parseMode = parseMode
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be mpeg4_gif
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Unique identifier for this result, 1-64 bytes
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * A valid URL for the MP4 file. File size must not exceed 1MB
    * @returns {string}
   */
   get mpeg4Url() {
       return this._mpeg4Url
   }

   /**
    * Video width
    * @returns {number|null}
   */
   get mpeg4Width() {
       return this._mpeg4Width
   }

   /**
    * Video height
    * @returns {number|null}
   */
   get mpeg4Height() {
       return this._mpeg4Height
   }

   /**
    * Video duration
    * @returns {number|null}
   */
   get mpeg4Duration() {
       return this._mpeg4Duration
   }

   /**
    * URL of the static thumbnail (jpeg or gif) for the result
    * @returns {string}
   */
   get thumbUrl() {
       return this._thumbUrl
   }

   /**
    * Title for the result
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    * Caption of the MPEG-4 file to be sent, 0-1024 characters
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
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the video animation
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultMpeg4Gif}
    */
   static deserialize(raw) {
      return new InlineQueryResultMpeg4Gif(
          raw['type'], 
          raw['id'], 
          raw['mpeg4_url'], 
          raw['mpeg4_width'] ? raw['mpeg4_width'] : null, 
          raw['mpeg4_height'] ? raw['mpeg4_height'] : null, 
          raw['mpeg4_duration'] ? raw['mpeg4_duration'] : null, 
          raw['thumb_url'], 
          raw['title'] ? raw['title'] : null, 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null, 
          raw['reply_markup'] ? InlineKeyboardMarkup.deserialize(raw['reply_markup']) : null, 
          raw['input_message_content'] ? InputMessageContent.deserialize(raw['input_message_content']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          id: this.id ? this.id : undefined, 
          mpeg4_url: this.mpeg4Url ? this.mpeg4Url : undefined, 
          mpeg4_width: this.mpeg4Width ? this.mpeg4Width : undefined, 
          mpeg4_height: this.mpeg4Height ? this.mpeg4Height : undefined, 
          mpeg4_duration: this.mpeg4Duration ? this.mpeg4Duration : undefined, 
          thumb_url: this.thumbUrl ? this.thumbUrl : undefined, 
          title: this.title ? this.title : undefined, 
          caption: this.caption ? this.caption : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined, 
          reply_markup: this.replyMarkup ? this.replyMarkup.serialize() : undefined, 
          input_message_content: this.inputMessageContent ? this.inputMessageContent.serialize() : undefined
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

module.exports = InlineQueryResultMpeg4Gif