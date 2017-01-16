'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker.
 */

class InlineQueryResultCachedSticker extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} stickerFileId
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(type, id, stickerFileId, replyMarkup, inputMessageContent) {
       super()
       this._type = type
       this._id = id
       this._stickerFileId = stickerFileId
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be sticker
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
    * A valid file identifier of the sticker
    * @returns {string}
   */
   get stickerFileId() {
       return this._stickerFileId
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the sticker
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultCachedSticker}
    */
   static deserialize(raw) {
      return new InlineQueryResultCachedSticker(
          raw['type'], 
          raw['id'], 
          raw['sticker_file_id'], 
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
          sticker_file_id: this.stickerFileId ? this.stickerFileId : undefined, 
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

module.exports = InlineQueryResultCachedSticker