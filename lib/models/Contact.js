'use strict'

/**
 * This object represents a phone contact.
 */

class Contact {
   /**
    *
    * @param {string} phoneNumber
    * @param {string} firstName
    * @param {string|null} [lastName]
    * @param {number|null} [userId]
    * @param {string|null} [vcard]
   */
   constructor(phoneNumber, firstName, lastName, userId, vcard) {
       this._phoneNumber = phoneNumber
       this._firstName = firstName
       this._lastName = lastName
       this._userId = userId
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
    * Contact's user identifier in Telegram
    * @returns {number|null}
   */
   get userId() {
       return this._userId
   }

   /**
    * Additional data about the contact in the form of a vCard
    * @returns {string|null}
   */
   get vcard() {
       return this._vcard
   }

   /**
    *
    * @param {Object} raw
    * @returns {Contact}
    */
   static deserialize(raw) {
      return new Contact(
          raw['phone_number'], 
          raw['first_name'], 
          raw['last_name'] ? raw['last_name'] : null, 
          raw['user_id'] ? raw['user_id'] : null, 
          raw['vcard'] ? raw['vcard'] : null
      )
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
          user_id: this.userId ? this.userId : undefined, 
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

module.exports = Contact