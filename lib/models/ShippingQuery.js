'use strict'

const User = require('./User')
const ShippingAddress = require('./ShippingAddress')

/**
 * This object contains information about an incoming shipping query.
 */

class ShippingQuery {
   /**
    *
    * @param {string} id
    * @param {User} from
    * @param {string} invoicePayload
    * @param {ShippingAddress} shippingAddress
   */
   constructor(id, from, invoicePayload, shippingAddress) {
       this._id = id
       this._from = from
       this._invoicePayload = invoicePayload
       this._shippingAddress = shippingAddress
   }

   /**
    * Unique query identifier
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * User who sent the query
    * @returns {User}
   */
   get from() {
       return this._from
   }

   /**
    * Bot specified invoice payload
    * @returns {string}
   */
   get invoicePayload() {
       return this._invoicePayload
   }

   /**
    * User specified shipping address
    * @returns {ShippingAddress}
   */
   get shippingAddress() {
       return this._shippingAddress
   }

   /**
    *
    * @param {Object} raw
    * @returns {ShippingQuery}
    */
   static deserialize(raw) {
      return new ShippingQuery(raw['id'], raw['from'] ? User.deserialize(raw['from']) : null, raw['invoice_payload'], raw['shipping_address'] ? ShippingAddress.deserialize(raw['shipping_address']) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          from: this.from ? this.from.serialize() : undefined, 
          invoice_payload: this.invoicePayload ? this.invoicePayload : undefined, 
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

module.exports = ShippingQuery