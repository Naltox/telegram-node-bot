'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue.
 */

class InlineQueryResultVenue extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {number} latitude
    * @param {number} longitude
    * @param {string} title
    * @param {string} address
    * @param {string|null} [foursquareId]
    * @param {string|null} [foursquareType]
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
     address, 
     foursquareId, 
     foursquareType, 
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
       this._address = address
       this._foursquareId = foursquareId
       this._foursquareType = foursquareType
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
       this._thumbUrl = thumbUrl
       this._thumbWidth = thumbWidth
       this._thumbHeight = thumbHeight
   }

   /**
    * Type of the result, must be venue
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
    * Latitude of the venue location in degrees
    * @returns {number}
   */
   get latitude() {
       return this._latitude
   }

   /**
    * Longitude of the venue location in degrees
    * @returns {number}
   */
   get longitude() {
       return this._longitude
   }

   /**
    * Title of the venue
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Address of the venue
    * @returns {string}
   */
   get address() {
       return this._address
   }

   /**
    * Foursquare identifier of the venue if known
    * @returns {string|null}
   */
   get foursquareId() {
       return this._foursquareId
   }

   /**
    * Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
    * @returns {string|null}
   */
   get foursquareType() {
       return this._foursquareType
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the venue
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
    * @returns {InlineQueryResultVenue}
    */
   static deserialize(raw) {
      return new InlineQueryResultVenue(
          raw['type'], 
          raw['id'], 
          raw['latitude'], 
          raw['longitude'], 
          raw['title'], 
          raw['address'], 
          raw['foursquare_id'] ? raw['foursquare_id'] : null, 
          raw['foursquare_type'] ? raw['foursquare_type'] : null, 
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
          address: this.address ? this.address : undefined, 
          foursquare_id: this.foursquareId ? this.foursquareId : undefined, 
          foursquare_type: this.foursquareType ? this.foursquareType : undefined, 
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

module.exports = InlineQueryResultVenue