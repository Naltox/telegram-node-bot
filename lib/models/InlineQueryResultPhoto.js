'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo.
 */

class InlineQueryResultPhoto extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} photoUrl
    * @param {string} thumbUrl
    * @param {number|null} [photoWidth]
    * @param {number|null} [photoHeight]
    * @param {string|null} [title]
    * @param {string|null} [description]
    * @param {string|null} [caption]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     photoUrl, 
     thumbUrl, 
     photoWidth, 
     photoHeight, 
     title, 
     description, 
     caption, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._photoUrl = photoUrl
       this._thumbUrl = thumbUrl
       this._photoWidth = photoWidth
       this._photoHeight = photoHeight
       this._title = title
       this._description = description
       this._caption = caption
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be photo
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
    * A valid URL of the photo. Photo must be in jpeg format. Photo size must not exceed 5MB
    * @returns {string}
   */
   get photoUrl() {
       return this._photoUrl
   }

   /**
    * URL of the thumbnail for the photo
    * @returns {string}
   */
   get thumbUrl() {
       return this._thumbUrl
   }

   /**
    * Width of the photo
    * @returns {number|null}
   */
   get photoWidth() {
       return this._photoWidth
   }

   /**
    * Height of the photo
    * @returns {number|null}
   */
   get photoHeight() {
       return this._photoHeight
   }

   /**
    * Title for the result
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    * Short description of the result
    * @returns {string|null}
   */
   get description() {
       return this._description
   }

   /**
    * Caption of the photo to be sent, 0-200 characters
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
    * Content of the message to be sent instead of the photo
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultPhoto}
    */
   static deserialize(raw) {
      return new InlineQueryResultPhoto(
          raw['type'], 
          raw['id'], 
          raw['photo_url'], 
          raw['thumb_url'], 
          raw['photo_width'] ? raw['photo_width'] : null, 
          raw['photo_height'] ? raw['photo_height'] : null, 
          raw['title'] ? raw['title'] : null, 
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
          photo_url: this.photoUrl ? this.photoUrl : undefined, 
          thumb_url: this.thumbUrl ? this.thumbUrl : undefined, 
          photo_width: this.photoWidth ? this.photoWidth : undefined, 
          photo_height: this.photoHeight ? this.photoHeight : undefined, 
          title: this.title ? this.title : undefined, 
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

module.exports = InlineQueryResultPhoto