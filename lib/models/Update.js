'use strict'

const Message = require('./Message')
const InlineQuery = require('./InlineQuery')
const ChosenInlineResult = require('./ChosenInlineResult')
const CallbackQuery = require('./CallbackQuery')

/**
 * This object represents an incoming update.Only one of the optional parameters can be present in any given update.
 */

class Update {
   /**
    *
    * @param {number} updateId
    * @param {Message|null} [message]
    * @param {Message|null} [editedMessage]
    * @param {InlineQuery|null} [inlineQuery]
    * @param {ChosenInlineResult|null} [chosenInlineResult]
    * @param {CallbackQuery|null} [callbackQuery]
   */
   constructor(updateId, message, editedMessage, inlineQuery, chosenInlineResult, callbackQuery) {
       this._updateId = updateId
       this._message = message
       this._editedMessage = editedMessage
       this._inlineQuery = inlineQuery
       this._chosenInlineResult = chosenInlineResult
       this._callbackQuery = callbackQuery
   }

   /**
    * The update‘s unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you’re using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order.
    * @returns {number}
   */
   get updateId() {
       return this._updateId
   }

   /**
    * New incoming message of any kind — text, photo, sticker, etc.
    * @returns {Message|null}
   */
   get message() {
       return this._message
   }

   /**
    * New version of a message that is known to the bot and was edited
    * @returns {Message|null}
   */
   get editedMessage() {
       return this._editedMessage
   }

   /**
    * New incoming inline query
    * @returns {InlineQuery|null}
   */
   get inlineQuery() {
       return this._inlineQuery
   }

   /**
    * The result of an inline query that was chosen by a user and sent to their chat partner.
    * @returns {ChosenInlineResult|null}
   */
   get chosenInlineResult() {
       return this._chosenInlineResult
   }

   /**
    * New incoming callback query
    * @returns {CallbackQuery|null}
   */
   get callbackQuery() {
       return this._callbackQuery
   }

   /**
    *
    * @param {Object} raw
    * @returns {Update}
    */
   static deserialize(raw) {
      return new Update(
          raw['update_id'], 
          raw['message'] ? Message.deserialize(raw['message']) : null, 
          raw['edited_message'] ? Message.deserialize(raw['edited_message']) : null, 
          raw['inline_query'] ? InlineQuery.deserialize(raw['inline_query']) : null, 
          raw['chosen_inline_result'] ? ChosenInlineResult.deserialize(raw['chosen_inline_result']) : null, 
          raw['callback_query'] ? CallbackQuery.deserialize(raw['callback_query']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          update_id: this.updateId ? this.updateId : undefined, 
          message: this.message ? this.message.serialize() : undefined, 
          edited_message: this.editedMessage ? this.editedMessage.serialize() : undefined, 
          inline_query: this.inlineQuery ? this.inlineQuery.serialize() : undefined, 
          chosen_inline_result: this.chosenInlineResult ? this.chosenInlineResult.serialize() : undefined, 
          callback_query: this.callbackQuery ? this.callbackQuery.serialize() : undefined
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

module.exports = Update