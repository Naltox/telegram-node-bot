'use strict'

const OrderInfo = require('./OrderInfo')

/**
 * This object contains basic information about a successful payment.
 */

class SuccessfulPayment {
   /**
    *
    * @param {string} currency
    * @param {number} totalAmount
    * @param {string} invoicePayload
    * @param {string|null} [shippingOptionId]
    * @param {OrderInfo|null} [orderInfo]
    * @param {string} telegramPaymentChargeId
    * @param {string} providerPaymentChargeId
   */
   constructor(
     currency, 
     totalAmount, 
     invoicePayload, 
     shippingOptionId, 
     orderInfo, 
     telegramPaymentChargeId, 
     providerPaymentChargeId
   ) {
       this._currency = currency
       this._totalAmount = totalAmount
       this._invoicePayload = invoicePayload
       this._shippingOptionId = shippingOptionId
       this._orderInfo = orderInfo
       this._telegramPaymentChargeId = telegramPaymentChargeId
       this._providerPaymentChargeId = providerPaymentChargeId
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
    * Telegram payment identifier
    * @returns {string}
   */
   get telegramPaymentChargeId() {
       return this._telegramPaymentChargeId
   }

   /**
    * Provider payment identifier
    * @returns {string}
   */
   get providerPaymentChargeId() {
       return this._providerPaymentChargeId
   }

   /**
    *
    * @param {Object} raw
    * @returns {SuccessfulPayment}
    */
   static deserialize(raw) {
      return new SuccessfulPayment(
          raw['currency'], 
          raw['total_amount'], 
          raw['invoice_payload'], 
          raw['shipping_option_id'] ? raw['shipping_option_id'] : null, 
          raw['order_info'] ? OrderInfo.deserialize(raw['order_info']) : null, 
          raw['telegram_payment_charge_id'], 
          raw['provider_payment_charge_id']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          currency: this.currency ? this.currency : undefined, 
          total_amount: this.totalAmount ? this.totalAmount : undefined, 
          invoice_payload: this.invoicePayload ? this.invoicePayload : undefined, 
          shipping_option_id: this.shippingOptionId ? this.shippingOptionId : undefined, 
          order_info: this.orderInfo ? this.orderInfo.serialize() : undefined, 
          telegram_payment_charge_id: this.telegramPaymentChargeId ? this.telegramPaymentChargeId : undefined, 
          provider_payment_charge_id: this.providerPaymentChargeId ? this.providerPaymentChargeId : undefined
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

module.exports = SuccessfulPayment