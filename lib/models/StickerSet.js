'use strict'

const Sticker = require('./Sticker')

/**
 * This object represents a sticker set.
 */

class StickerSet {
   /**
    *
    * @param {string} name
    * @param {string} title
    * @param {boolean} containsMasks
    * @param {Sticker[]} stickers
   */
   constructor(name, title, containsMasks, stickers) {
       this._name = name
       this._title = title
       this._containsMasks = containsMasks
       this._stickers = stickers
   }

   /**
    * Sticker set name
    * @returns {string}
   */
   get name() {
       return this._name
   }

   /**
    * Sticker set title
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * True, if the sticker set contains masks
    * @returns {boolean}
   */
   get containsMasks() {
       return this._containsMasks
   }

   /**
    * List of all set stickers
    * @returns {Sticker[]}
   */
   get stickers() {
       return this._stickers
   }

   /**
    *
    * @param {Object} raw
    * @returns {StickerSet}
    */
   static deserialize(raw) {
      return new StickerSet(raw['name'], raw['title'], raw['contains_masks'], raw['stickers'] ? raw['stickers'].map(item => Sticker.deserialize(item)) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          name: this.name ? this.name : undefined, 
          title: this.title ? this.title : undefined, 
          contains_masks: this.containsMasks ? this.containsMasks : undefined, 
          stickers: this.stickers ? this.stickers.map(item => item.serialize()) : undefined
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

module.exports = StickerSet