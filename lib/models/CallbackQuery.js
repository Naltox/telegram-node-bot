'use strict'

const User = require('./User')
const Message = require('./Message')

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.
 */

class CallbackQuery {
   /**
    *
    * @param {string} id
    * @param {User} from
    * @param {Message|null} [message]
    * @param {string|null} [inlineMessageId]
    * @param {string} chatInstance
    * @param {string|null} [data]
    * @param {string|null} [gameShortName]
   */
   constructor(
     id, 
     from, 
     message, 
     inlineMessageId, 
     chatInstance, 
     data, 
     gameShortName
   ) {
       this._id = id
       this._from = from
       this._message = message
       this._inlineMessageId = inlineMessageId
       this._chatInstance = chatInstance
       this._data = data
       this._gameShortName = gameShortName
   }

   /**
    * Unique identifier for this query
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * Sender
    * @returns {User}
   */
   get from() {
       return this._from
   }

   /**
    * Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old
    * @returns {Message|null}
   */
   get message() {
       return this._message
   }

   /**
    * Identifier of the message sent via the bot in inline mode, that originated the query.
    * @returns {string|null}
   */
   get inlineMessageId() {
       return this._inlineMessageId
   }

   /**
    * Identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games.
    * @returns {string}
   */
   get chatInstance() {
       return this._chatInstance
   }

   /**
    * Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field.
    * @returns {string|null}
   */
   get data() {
       return this._data
   }

   /**
    * Short name of a Game to be returned, serves as the unique identifier for the game
    * @returns {string|null}
   */
   get gameShortName() {
       return this._gameShortName
   }

   /**
    *
    * @param {Object} raw
    * @returns {CallbackQuery}
    */
   static deserialize(raw) {
      return new CallbackQuery(
          raw['id'], 
          raw['from'] ? User.deserialize(raw['from']) : null, 
          raw['message'] ? Message.deserialize(raw['message']) : null, 
          raw['inline_message_id'] ? raw['inline_message_id'] : null, 
          raw['chat_instance'], 
          raw['data'] ? raw['data'] : null, 
          raw['game_short_name'] ? raw['game_short_name'] : null
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
          message: this.message ? this.message.serialize() : undefined, 
          inline_message_id: this.inlineMessageId ? this.inlineMessageId : undefined, 
          chat_instance: this.chatInstance ? this.chatInstance : undefined, 
          data: this.data ? this.data : undefined, 
          game_short_name: this.gameShortName ? this.gameShortName : undefined
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

module.exports = CallbackQuery