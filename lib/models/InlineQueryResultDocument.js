'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method.
 */

class InlineQueryResultDocument extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} title
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {string} documentUrl
    * @param {string} mimeType
    * @param {string|null} [description]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
    * @param {string|null} [thumbUrl]
    * @param {number|null} [thumbWidth]
    * @param {number|null} [thumbHeight]
   */
   constructor(
     type, 
     id, 
     title, 
     caption, 
     parseMode, 
     documentUrl, 
     mimeType, 
     description, 
     replyMarkup, 
     inputMessageContent, 
     thumbUrl, 
     thumbWidth, 
     thumbHeight
   ) {
       super()
       this._type = type
       this._id = id
       this._title = title
       this._caption = caption
       this._parseMode = parseMode
       this._documentUrl = documentUrl
       this._mimeType = mimeType
       this._description = description
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
       this._thumbUrl = thumbUrl
       this._thumbWidth = thumbWidth
       this._thumbHeight = thumbHeight
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
    * A valid URL for the file
    * @returns {string}
   */
   get documentUrl() {
       return this._documentUrl
   }

   /**
    * Mime type of the content of the file, either “application/pdf” or “application/zip”
    * @returns {string}
   */
   get mimeType() {
       return this._mimeType
   }

   /**
    * Short description of the result
    * @returns {string|null}
   */
   get description() {
       return this._description
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
    * URL of the thumbnail (jpeg only) for the file
    * @returns {string|null}
   */
   get thumbUrl() {
       return this._thumbUrl
   }

   /**
    * Thumbnail width
    * @returns {number|null}
   */
   get thumbWidth() {
       return this._thumbWidth
   }

   /**
    * Thumbnail height
    * @returns {number|null}
   */
   get thumbHeight() {
       return this._thumbHeight
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultDocument}
    */
   static deserialize(raw) {
      return new InlineQueryResultDocument(
          raw['type'], 
          raw['id'], 
          raw['title'], 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null, 
          raw['document_url'], 
          raw['mime_type'], 
          raw['description'] ? raw['description'] : null, 
          raw['reply_markup'] ? InlineKeyboardMarkup.deserialize(raw['reply_markup']) : null, 
          raw['input_message_content'] ? InputMessageContent.deserialize(raw['input_message_content']) : null, 
          raw['thumb_url'] ? raw['thumb_url'] : null, 
          raw['thumb_width'] ? raw['thumb_width'] : null, 
          raw['thumb_height'] ? raw['thumb_height'] : null
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
          caption: this.caption ? this.caption : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined, 
          document_url: this.documentUrl ? this.documentUrl : undefined, 
          mime_type: this.mimeType ? this.mimeType : undefined, 
          description: this.description ? this.description : undefined, 
          reply_markup: this.replyMarkup ? this.replyMarkup.serialize() : undefined, 
          input_message_content: this.inputMessageContent ? this.inputMessageContent.serialize() : undefined, 
          thumb_url: this.thumbUrl ? this.thumbUrl : undefined, 
          thumb_width: this.thumbWidth ? this.thumbWidth : undefined, 
          thumb_height: this.thumbHeight ? this.thumbHeight : undefined
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

module.exports = InlineQueryResultDocument