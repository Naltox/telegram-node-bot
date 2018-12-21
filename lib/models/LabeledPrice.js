'use strict'

/**
 * This object represents a portion of the price for goods or services.
 */

class LabeledPrice {
   /**
    *
    * @param {string} label
    * @param {number} amount
   */
   constructor(label, amount) {
       this._label = label
       this._amount = amount
   }

   /**
    * Portion label
    * @returns {string}
   */
   get label() {
       return this._label
   }

   /**
    * Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
    * @returns {number}
   */
   get amount() {
       return this._amount
   }

   /**
    *
    * @param {Object} raw
    * @returns {LabeledPrice}
    */
   static deserialize(raw) {
      return new LabeledPrice(raw['label'], raw['amount'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          label: this.label ? this.label : undefined, 
          amount: this.amount ? this.amount : undefined
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

module.exports = LabeledPrice