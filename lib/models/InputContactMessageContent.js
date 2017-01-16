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
   */
   constructor(phoneNumber, firstName, lastName) {
       super()
       this._phoneNumber = phoneNumber
       this._firstName = firstName
       this._lastName = lastName
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
    *
    * @param {Object} raw
    * @returns {InputContactMessageContent}
    */
   static deserialize(raw) {
      return new InputContactMessageContent(raw['phone_number'], raw['first_name'], raw['last_name'] ? raw['last_name'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          phone_number: this.phoneNumber ? this.phoneNumber : undefined, 
          first_name: this.firstName ? this.firstName : undefined, 
          last_name: this.lastName ? this.lastName : undefined
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