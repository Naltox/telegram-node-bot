'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact.
 */

class InlineQueryResultContact extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} phoneNumber
    * @param {string} firstName
    * @param {string|null} [lastName]
    * @param {string|null} [vcard]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
    * @param {string|null} [thumbUrl]
    * @param {number|null} [thumbWidth]
    * @param {number|null} [thumbHeight]
   */
   constructor(
     type, 
     id, 
     phoneNumber, 
     firstName, 
     lastName, 
     vcard, 
     replyMarkup, 
     inputMessageContent, 
     thumbUrl, 
     thumbWidth, 
     thumbHeight
   ) {
       super()
       this._type = type
       this._id = id
       this._phoneNumber = phoneNumber
       this._firstName = firstName
       this._lastName = lastName
       this._vcard = vcard
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
       this._thumbUrl = thumbUrl
       this._thumbWidth = thumbWidth
       this._thumbHeight = thumbHeight
   }

   /**
    * Type of the result, must be contact
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
    * Contact's phone number
    * @returns {string}
   */
   get phoneNumber() {
       return this._phoneNumber
   }

   /**
    * Contact's first name
    * @returns {string}
   */
   get firstName() {
       return this._firstName
   }

   /**
    * Contact's last name
    * @returns {string|null}
   */
   get lastName() {
       return this._lastName
   }

   /**
    * Additional data about the contact in the form of a vCard, 0-2048 bytes
    * @returns {string|null}
   */
   get vcard() {
       return this._vcard
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the contact
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
    * @returns {InlineQueryResultContact}
    */
   static deserialize(raw) {
      return new InlineQueryResultContact(
          raw['type'], 
          raw['id'], 
          raw['phone_number'], 
          raw['first_name'], 
          raw['last_name'] ? raw['last_name'] : null, 
          raw['vcard'] ? raw['vcard'] : null, 
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
          phone_number: this.phoneNumber ? this.phoneNumber : undefined, 
          first_name: this.firstName ? this.firstName : undefined, 
          last_name: this.lastName ? this.lastName : undefined, 
          vcard: this.vcard ? this.vcard : undefined, 
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

module.exports = InlineQueryResultContact