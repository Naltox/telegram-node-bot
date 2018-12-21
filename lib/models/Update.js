'use strict'

const Message = require('./Message')
const InlineQuery = require('./InlineQuery')
const ChosenInlineResult = require('./ChosenInlineResult')
const CallbackQuery = require('./CallbackQuery')
const ShippingQuery = require('./ShippingQuery')
const PreCheckoutQuery = require('./PreCheckoutQuery')

/**
 * This object represents an incoming update.At most one of the optional parameters can be present in any given update.
 */

class Update {
   /**
    *
    * @param {number} updateId
    * @param {Message|null} [message]
    * @param {Message|null} [editedMessage]
    * @param {Message|null} [channelPost]
    * @param {Message|null} [editedChannelPost]
    * @param {InlineQuery|null} [inlineQuery]
    * @param {ChosenInlineResult|null} [chosenInlineResult]
    * @param {CallbackQuery|null} [callbackQuery]
    * @param {ShippingQuery|null} [shippingQuery]
    * @param {PreCheckoutQuery|null} [preCheckoutQuery]
   */
   constructor(
     updateId, 
     message, 
     editedMessage, 
     channelPost, 
     editedChannelPost, 
     inlineQuery, 
     chosenInlineResult, 
     callbackQuery, 
     shippingQuery, 
     preCheckoutQuery
   ) {
       this._updateId = updateId
       this._message = message
       this._editedMessage = editedMessage
       this._channelPost = channelPost
       this._editedChannelPost = editedChannelPost
       this._inlineQuery = inlineQuery
       this._chosenInlineResult = chosenInlineResult
       this._callbackQuery = callbackQuery
       this._shippingQuery = shippingQuery
       this._preCheckoutQuery = preCheckoutQuery
   }

   /**
    * The update‘s unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you’re using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially.
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
    * New incoming channel post of any kind — text, photo, sticker, etc.
    * @returns {Message|null}
   */
   get channelPost() {
       return this._channelPost
   }

   /**
    * New version of a channel post that is known to the bot and was edited
    * @returns {Message|null}
   */
   get editedChannelPost() {
       return this._editedChannelPost
   }

   /**
    * New incoming inline query
    * @returns {InlineQuery|null}
   */
   get inlineQuery() {
       return this._inlineQuery
   }

   /**
    * The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot.
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
    * New incoming shipping query. Only for invoices with flexible price
    * @returns {ShippingQuery|null}
   */
   get shippingQuery() {
       return this._shippingQuery
   }

   /**
    * New incoming pre-checkout query. Contains full information about checkout
    * @returns {PreCheckoutQuery|null}
   */
   get preCheckoutQuery() {
       return this._preCheckoutQuery
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
          raw['channel_post'] ? Message.deserialize(raw['channel_post']) : null, 
          raw['edited_channel_post'] ? Message.deserialize(raw['edited_channel_post']) : null, 
          raw['inline_query'] ? InlineQuery.deserialize(raw['inline_query']) : null, 
          raw['chosen_inline_result'] ? ChosenInlineResult.deserialize(raw['chosen_inline_result']) : null, 
          raw['callback_query'] ? CallbackQuery.deserialize(raw['callback_query']) : null, 
          raw['shipping_query'] ? ShippingQuery.deserialize(raw['shipping_query']) : null, 
          raw['pre_checkout_query'] ? PreCheckoutQuery.deserialize(raw['pre_checkout_query']) : null
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
          channel_post: this.channelPost ? this.channelPost.serialize() : undefined, 
          edited_channel_post: this.editedChannelPost ? this.editedChannelPost.serialize() : undefined, 
          inline_query: this.inlineQuery ? this.inlineQuery.serialize() : undefined, 
          chosen_inline_result: this.chosenInlineResult ? this.chosenInlineResult.serialize() : undefined, 
          callback_query: this.callbackQuery ? this.callbackQuery.serialize() : undefined, 
          shipping_query: this.shippingQuery ? this.shippingQuery.serialize() : undefined, 
          pre_checkout_query: this.preCheckoutQuery ? this.preCheckoutQuery.serialize() : undefined
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