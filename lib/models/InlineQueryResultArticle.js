'use strict'

const InputMessageContent = require('./InputMessageContent')
const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to an article or web page.
 */

class InlineQueryResultArticle extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} title
    * @param {InputMessageContent} inputMessageContent
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {string|null} [url]
    * @param {boolean|null} [hideUrl]
    * @param {string|null} [description]
    * @param {string|null} [thumbUrl]
    * @param {number|null} [thumbWidth]
    * @param {number|null} [thumbHeight]
   */
   constructor(
     type, 
     id, 
     title, 
     inputMessageContent, 
     replyMarkup, 
     url, 
     hideUrl, 
     description, 
     thumbUrl, 
     thumbWidth, 
     thumbHeight
   ) {
       super()
       this._type = type
       this._id = id
       this._title = title
       this._inputMessageContent = inputMessageContent
       this._replyMarkup = replyMarkup
       this._url = url
       this._hideUrl = hideUrl
       this._description = description
       this._thumbUrl = thumbUrl
       this._thumbWidth = thumbWidth
       this._thumbHeight = thumbHeight
   }

   /**
    * Type of the result, must be article
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Unique identifier for this result, 1-64 Bytes
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * Title of the result
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Content of the message to be sent
    * @returns {InputMessageContent}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * URL of the result
    * @returns {string|null}
   */
   get url() {
       return this._url
   }

   /**
    * Pass True, if you don't want the URL to be shown in the message
    * @returns {boolean|null}
   */
   get hideUrl() {
       return this._hideUrl
   }

   /**
    * Short description of the result
    * @returns {string|null}
   */
   get description() {
       return this._description
   }

   /**
    * Url of the thumbnail for the result
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
    * @returns {InlineQueryResultArticle}
    */
   static deserialize(raw) {
      return new InlineQueryResultArticle(
          raw['type'], 
          raw['id'], 
          raw['title'], 
          raw['input_message_content'] ? InputMessageContent.deserialize(raw['input_message_content']) : null, 
          raw['reply_markup'] ? InlineKeyboardMarkup.deserialize(raw['reply_markup']) : null, 
          raw['url'] ? raw['url'] : null, 
          raw['hide_url'] ? raw['hide_url'] : null, 
          raw['description'] ? raw['description'] : null, 
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
          input_message_content: this.inputMessageContent ? this.inputMessageContent.serialize() : undefined, 
          reply_markup: this.replyMarkup ? this.replyMarkup.serialize() : undefined, 
          url: this.url ? this.url : undefined, 
          hide_url: this.hideUrl ? this.hideUrl : undefined, 
          description: this.description ? this.description : undefined, 
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

module.exports = InlineQueryResultArticle