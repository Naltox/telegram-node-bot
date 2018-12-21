'use strict'

/**
 * This object contains basic information about an invoice.
 */

class Invoice {
   /**
    *
    * @param {string} title
    * @param {string} description
    * @param {string} startParameter
    * @param {string} currency
    * @param {number} totalAmount
   */
   constructor(title, description, startParameter, currency, totalAmount) {
       this._title = title
       this._description = description
       this._startParameter = startParameter
       this._currency = currency
       this._totalAmount = totalAmount
   }

   /**
    * Product name
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Product description
    * @returns {string}
   */
   get description() {
       return this._description
   }

   /**
    * Unique bot deep-linking parameter that can be used to generate this invoice
    * @returns {string}
   */
   get startParameter() {
       return this._startParameter
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
    *
    * @param {Object} raw
    * @returns {Invoice}
    */
   static deserialize(raw) {
      return new Invoice(
          raw['title'], 
          raw['description'], 
          raw['start_parameter'], 
          raw['currency'], 
          raw['total_amount']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          title: this.title ? this.title : undefined, 
          description: this.description ? this.description : undefined, 
          start_parameter: this.startParameter ? this.startParameter : undefined, 
          currency: this.currency ? this.currency : undefined, 
          total_amount: this.totalAmount ? this.totalAmount : undefined
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

module.exports = Invoice