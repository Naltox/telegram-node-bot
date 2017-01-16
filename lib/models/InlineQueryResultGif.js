'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 */

class InlineQueryResultGif extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} gifUrl
    * @param {number|null} [gifWidth]
    * @param {number|null} [gifHeight]
    * @param {string} thumbUrl
    * @param {string|null} [title]
    * @param {string|null} [caption]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     gifUrl, 
     gifWidth, 
     gifHeight, 
     thumbUrl, 
     title, 
     caption, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._gifUrl = gifUrl
       this._gifWidth = gifWidth
       this._gifHeight = gifHeight
       this._thumbUrl = thumbUrl
       this._title = title
       this._caption = caption
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be gif
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
    * A valid URL for the GIF file. File size must not exceed 1MB
    * @returns {string}
   */
   get gifUrl() {
       return this._gifUrl
   }

   /**
    * Width of the GIF
    * @returns {number|null}
   */
   get gifWidth() {
       return this._gifWidth
   }

   /**
    * Height of the GIF
    * @returns {number|null}
   */
   get gifHeight() {
       return this._gifHeight
   }

   /**
    * URL of the static thumbnail for the result (jpeg or gif)
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
    * Caption of the GIF file to be sent, 0-200 characters
    * @returns {string|null}
   */
   get caption() {
       return this._caption
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the GIF animation
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultGif}
    */
   static deserialize(raw) {
      return new InlineQueryResultGif(
          raw['type'], 
          raw['id'], 
          raw['gif_url'], 
          raw['gif_width'] ? raw['gif_width'] : null, 
          raw['gif_height'] ? raw['gif_height'] : null, 
          raw['thumb_url'], 
          raw['title'] ? raw['title'] : null, 
          raw['caption'] ? raw['caption'] : null, 
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
          gif_url: this.gifUrl ? this.gifUrl : undefined, 
          gif_width: this.gifWidth ? this.gifWidth : undefined, 
          gif_height: this.gifHeight ? this.gifHeight : undefined, 
          thumb_url: this.thumbUrl ? this.thumbUrl : undefined, 
          title: this.title ? this.title : undefined, 
          caption: this.caption ? this.caption : undefined, 
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

module.exports = InlineQueryResultGif