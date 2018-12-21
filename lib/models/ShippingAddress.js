'use strict'

/**
 * This object represents a shipping address.
 */

class ShippingAddress {
   /**
    *
    * @param {string} countryCode
    * @param {string} state
    * @param {string} city
    * @param {string} streetLine1
    * @param {string} streetLine2
    * @param {string} postCode
   */
   constructor(countryCode, state, city, streetLine1, streetLine2, postCode) {
       this._countryCode = countryCode
       this._state = state
       this._city = city
       this._streetLine1 = streetLine1
       this._streetLine2 = streetLine2
       this._postCode = postCode
   }

   /**
    * ISO 3166-1 alpha-2 country code
    * @returns {string}
   */
   get countryCode() {
       return this._countryCode
   }

   /**
    * State, if applicable
    * @returns {string}
   */
   get state() {
       return this._state
   }

   /**
    * City
    * @returns {string}
   */
   get city() {
       return this._city
   }

   /**
    * First line for the address
    * @returns {string}
   */
   get streetLine1() {
       return this._streetLine1
   }

   /**
    * Second line for the address
    * @returns {string}
   */
   get streetLine2() {
       return this._streetLine2
   }

   /**
    * Address post code
    * @returns {string}
   */
   get postCode() {
       return this._postCode
   }

   /**
    *
    * @param {Object} raw
    * @returns {ShippingAddress}
    */
   static deserialize(raw) {
      return new ShippingAddress(
          raw['country_code'], 
          raw['state'], 
          raw['city'], 
          raw['street_line1'], 
          raw['street_line2'], 
          raw['post_code']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          country_code: this.countryCode ? this.countryCode : undefined, 
          state: this.state ? this.state : undefined, 
          city: this.city ? this.city : undefined, 
          street_line1: this.streetLine1 ? this.streetLine1 : undefined, 
          street_line2: this.streetLine2 ? this.streetLine2 : undefined, 
          post_code: this.postCode ? this.postCode : undefined
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

module.exports = ShippingAddress