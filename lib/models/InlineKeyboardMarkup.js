'use strict'

const InlineKeyboardButton = require('./InlineKeyboardButton')

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 */

class InlineKeyboardMarkup {
   /**
    *
    * @param {InlineKeyboardButton[][]} inlineKeyboard
   */
   constructor(inlineKeyboard) {
       this._inlineKeyboard = inlineKeyboard
   }

   /**
    * Array of button rows, each represented by an Array of InlineKeyboardButton objects
    * @returns {InlineKeyboardButton[][]}
   */
   get inlineKeyboard() {
       return this._inlineKeyboard
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineKeyboardMarkup}
    */
   static deserialize(raw) {
      return new InlineKeyboardMarkup(raw['inline_keyboard'] ? raw['inline_keyboard'].map(arr => arr.map(item => InlineKeyboardButton.deserialize(item))) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          inline_keyboard: this.inlineKeyboard ? this.inlineKeyboard.map(arr => arr.map(item => item.serialize())) : undefined
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

module.exports = InlineKeyboardMarkup