'use strict'

const LabeledPrice = require('./LabeledPrice')

/**
 * This object represents one shipping option.
 */

class ShippingOption {
   /**
    *
    * @param {string} id
    * @param {string} title
    * @param {LabeledPrice[]} prices
   */
   constructor(id, title, prices) {
       this._id = id
       this._title = title
       this._prices = prices
   }

   /**
    * Shipping option identifier
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * Option title
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * List of price portions
    * @returns {LabeledPrice[]}
   */
   get prices() {
       return this._prices
   }

   /**
    *
    * @param {Object} raw
    * @returns {ShippingOption}
    */
   static deserialize(raw) {
      return new ShippingOption(raw['id'], raw['title'], raw['prices'] ? raw['prices'].map(item => LabeledPrice.deserialize(item)) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          title: this.title ? this.title : undefined, 
          prices: this.prices ? this.prices.map(item => item.serialize()) : undefined
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

module.exports = ShippingOption