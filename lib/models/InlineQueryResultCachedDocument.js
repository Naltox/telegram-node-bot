'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only pdf-files and zip archives can be sent using this method.
 */

class InlineQueryResultCachedDocument extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} title
    * @param {string} documentFileId
    * @param {string|null} [description]
    * @param {string|null} [caption]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     title, 
     documentFileId, 
     description, 
     caption, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._title = title
       this._documentFileId = documentFileId
       this._description = description
       this._caption = caption
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be document
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
    * Title for the result
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * A valid file identifier for the file
    * @returns {string}
   */
   get documentFileId() {
       return this._documentFileId
   }

   /**
    * Short description of the result
    * @returns {string|null}
   */
   get description() {
       return this._description
   }

   /**
    * Caption of the document to be sent, 0-200 characters
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
    * Content of the message to be sent instead of the file
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultCachedDocument}
    */
   static deserialize(raw) {
      return new InlineQueryResultCachedDocument(
          raw['type'], 
          raw['id'], 
          raw['title'], 
          raw['document_file_id'], 
          raw['description'] ? raw['description'] : null, 
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
          title: this.title ? this.title : undefined, 
          document_file_id: this.documentFileId ? this.documentFileId : undefined, 
          description: this.description ? this.description : undefined, 
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

module.exports = InlineQueryResultCachedDocument