'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location.
 */

class InlineQueryResultLocation extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {number} latitude
    * @param {number} longitude
    * @param {string} title
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
    * @param {string|null} [thumbUrl]
    * @param {number|null} [thumbWidth]
    * @param {number|null} [thumbHeight]
   */
   constructor(
     type, 
     id, 
     latitude, 
     longitude, 
     title, 
     replyMarkup, 
     inputMessageContent, 
     thumbUrl, 
     thumbWidth, 
     thumbHeight
   ) {
       super()
       this._type = type
       this._id = id
       this._latitude = latitude
       this._longitude = longitude
       this._title = title
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
       this._thumbUrl = thumbUrl
       this._thumbWidth = thumbWidth
       this._thumbHeight = thumbHeight
   }

   /**
    * Type of the result, must be location
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
    * Location latitude in degrees
    * @returns {number}
   */
   get latitude() {
       return this._latitude
   }

   /**
    * Location longitude in degrees
    * @returns {number}
   */
   get longitude() {
       return this._longitude
   }

   /**
    * Location title
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the location
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
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
    * @returns {InlineQueryResultLocation}
    */
   static deserialize(raw) {
      return new InlineQueryResultLocation(
          raw['type'], 
          raw['id'], 
          raw['latitude'], 
          raw['longitude'], 
          raw['title'], 
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
          latitude: this.latitude ? this.latitude : undefined, 
          longitude: this.longitude ? this.longitude : undefined, 
          title: this.title ? this.title : undefined, 
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

module.exports = InlineQueryResultLocation