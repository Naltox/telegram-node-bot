'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation.
 */

class InlineQueryResultCachedGif extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} gifFileId
    * @param {string|null} [title]
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     gifFileId, 
     title, 
     caption, 
     parseMode, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._gifFileId = gifFileId
       this._title = title
       this._caption = caption
       this._parseMode = parseMode
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
    * A valid file identifier for the GIF file
    * @returns {string}
   */
   get gifFileId() {
       return this._gifFileId
   }

   /**
    * Title for the result
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    * Caption of the GIF file to be sent, 0-1024 characters
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
    * Content of the message to be sent instead of the GIF animation
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultCachedGif}
    */
   static deserialize(raw) {
      return new InlineQueryResultCachedGif(
          raw['type'], 
          raw['id'], 
          raw['gif_file_id'], 
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
          gif_file_id: this.gifFileId ? this.gifFileId : undefined, 
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

module.exports = InlineQueryResultCachedGif