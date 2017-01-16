'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 */

class InlineQueryResultCachedMpeg4Gif extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} mpeg4FileId
    * @param {string|null} [title]
    * @param {string|null} [caption]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     mpeg4FileId, 
     title, 
     caption, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._mpeg4FileId = mpeg4FileId
       this._title = title
       this._caption = caption
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
    * A valid file identifier for the MP4 file
    * @returns {string}
   */
   get mpeg4FileId() {
       return this._mpeg4FileId
   }

   /**
    * Title for the result
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    * Caption of the MPEG-4 file to be sent, 0-200 characters
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
    * Content of the message to be sent instead of the video animation
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultCachedMpeg4Gif}
    */
   static deserialize(raw) {
      return new InlineQueryResultCachedMpeg4Gif(
          raw['type'], 
          raw['id'], 
          raw['mpeg4_file_id'], 
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
          mpeg4_file_id: this.mpeg4FileId ? this.mpeg4FileId : undefined, 
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

module.exports = InlineQueryResultCachedMpeg4Gif