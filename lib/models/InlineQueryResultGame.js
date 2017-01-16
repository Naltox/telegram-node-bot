'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a Game.
 */

class InlineQueryResultGame extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} gameShortName
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
   */
   constructor(type, id, gameShortName, replyMarkup) {
       super()
       this._type = type
       this._id = id
       this._gameShortName = gameShortName
       this._replyMarkup = replyMarkup
   }

   /**
    * Type of the result, must be game
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Unique identifier for this result, 1-64 bytes
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * Short name of the game
    * @returns {string}
   */
   get gameShortName() {
       return this._gameShortName
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultGame}
    */
   static deserialize(raw) {
      return new InlineQueryResultGame(raw['type'], raw['id'], raw['game_short_name'], raw['reply_markup'] ? InlineKeyboardMarkup.deserialize(raw['reply_markup']) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          id: this.id ? this.id : undefined, 
          game_short_name: this.gameShortName ? this.gameShortName : undefined, 
          reply_markup: this.replyMarkup ? this.replyMarkup.serialize() : undefined
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

module.exports = InlineQueryResultGame