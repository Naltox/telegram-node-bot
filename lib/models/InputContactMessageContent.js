'use strict'

const InputMessageContent = require('./InputMessageContent')
/**
 * Represents the content of a contact message to be sent as the result of an inline query. 
 */

class InputContactMessageContent extends InputMessageContent {
   /**
    *
    * @param {string} phoneNumber
    * @param {string} firstName
    * @param {string|null} [lastName]
    * @param {string|null} [vcard]
   */
   constructor(phoneNumber, firstName, lastName, vcard) {
       super()
       this._phoneNumber = phoneNumber
       this._firstName = firstName
       this._lastName = lastName
       this._vcard = vcard
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
    *
    * @param {Object} raw
    * @returns {InputContactMessageContent}
    */
   static deserialize(raw) {
      return new InputContactMessageContent(raw['phone_number'], raw['first_name'], raw['last_name'] ? raw['last_name'] : null, raw['vcard'] ? raw['vcard'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          phone_number: this.phoneNumber ? this.phoneNumber : undefined, 
          first_name: this.firstName ? this.firstName : undefined, 
          last_name: this.lastName ? this.lastName : undefined, 
          vcard: this.vcard ? this.vcard : undefined
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

module.exports = InputContactMessageContent