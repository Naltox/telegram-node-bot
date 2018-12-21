'use strict'

const User = require('./User')
const OrderInfo = require('./OrderInfo')

/**
 * This object contains information about an incoming pre-checkout query.
 */

class PreCheckoutQuery {
   /**
    *
    * @param {string} id
    * @param {User} from
    * @param {string} currency
    * @param {number} totalAmount
    * @param {string} invoicePayload
    * @param {string|null} [shippingOptionId]
    * @param {OrderInfo|null} [orderInfo]
   */
   constructor(
     id, 
     from, 
     currency, 
     totalAmount, 
     invoicePayload, 
     shippingOptionId, 
     orderInfo
   ) {
       this._id = id
       this._from = from
       this._currency = currency
       this._totalAmount = totalAmount
       this._invoicePayload = invoicePayload
       this._shippingOptionId = shippingOptionId
       this._orderInfo = orderInfo
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
    * Three-letter ISO 4217 currency code
    * @returns {string}
   */
   get currency() {
       return this._currency
   }

   /**
    * Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
    * @returns {number}
   */
   get totalAmount() {
       return this._totalAmount
   }

   /**
    * Bot specified invoice payload
    * @returns {string}
   */
   get invoicePayload() {
       return this._invoicePayload
   }

   /**
    * Identifier of the shipping option chosen by the user
    * @returns {string|null}
   */
   get shippingOptionId() {
       return this._shippingOptionId
   }

   /**
    * Order info provided by the user
    * @returns {OrderInfo|null}
   */
   get orderInfo() {
       return this._orderInfo
   }

   /**
    *
    * @param {Object} raw
    * @returns {PreCheckoutQuery}
    */
   static deserialize(raw) {
      return new PreCheckoutQuery(
          raw['id'], 
          raw['from'] ? User.deserialize(raw['from']) : null, 
          raw['currency'], 
          raw['total_amount'], 
          raw['invoice_payload'], 
          raw['shipping_option_id'] ? raw['shipping_option_id'] : null, 
          raw['order_info'] ? OrderInfo.deserialize(raw['order_info']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          from: this.from ? this.from.serialize() : undefined, 
          currency: this.currency ? this.currency : undefined, 
          total_amount: this.totalAmount ? this.totalAmount : undefined, 
          invoice_payload: this.invoicePayload ? this.invoicePayload : undefined, 
          shipping_option_id: this.shippingOptionId ? this.shippingOptionId : undefined, 
          order_info: this.orderInfo ? this.orderInfo.serialize() : undefined
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

module.exports = PreCheckoutQuery