'use strict'

const ShippingAddress = require('./ShippingAddress')

/**
 * This object represents information about an order.
 */

class OrderInfo {
   /**
    *
    * @param {string|null} [name]
    * @param {string|null} [phoneNumber]
    * @param {string|null} [email]
    * @param {ShippingAddress|null} [shippingAddress]
   */
   constructor(name, phoneNumber, email, shippingAddress) {
       this._name = name
       this._phoneNumber = phoneNumber
       this._email = email
       this._shippingAddress = shippingAddress
   }

   /**
    * User name
    * @returns {string|null}
   */
   get name() {
       return this._name
   }

   /**
    * User's phone number
    * @returns {string|null}
   */
   get phoneNumber() {
       return this._phoneNumber
   }

   /**
    * User email
    * @returns {string|null}
   */
   get email() {
       return this._email
   }

   /**
    * User shipping address
    * @returns {ShippingAddress|null}
   */
   get shippingAddress() {
       return this._shippingAddress
   }

   /**
    *
    * @param {Object} raw
    * @returns {OrderInfo}
    */
   static deserialize(raw) {
      return new OrderInfo(raw['name'] ? raw['name'] : null, raw['phone_number'] ? raw['phone_number'] : null, raw['email'] ? raw['email'] : null, raw['shipping_address'] ? ShippingAddress.deserialize(raw['shipping_address']) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          name: this.name ? this.name : undefined, 
          phone_number: this.phoneNumber ? this.phoneNumber : undefined, 
          email: this.email ? this.email : undefined, 
          shipping_address: this.shippingAddress ? this.shippingAddress.serialize() : undefined
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

module.exports = OrderInfo