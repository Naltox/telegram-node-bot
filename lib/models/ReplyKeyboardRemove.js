'use strict'

/**
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup).
 */

class ReplyKeyboardRemove {
   /**
    *
    * @param {boolean} removeKeyboard
    * @param {boolean|null} [selective]
   */
   constructor(removeKeyboard, selective) {
       this._removeKeyboard = removeKeyboard
       this._selective = selective
   }

   /**
    * Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup)
    * @returns {boolean}
   */
   get removeKeyboard() {
       return this._removeKeyboard
   }

   /**
    * Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
    * @returns {boolean|null}
   */
   get selective() {
       return this._selective
   }

   /**
    *
    * @param {Object} raw
    * @returns {ReplyKeyboardRemove}
    */
   static deserialize(raw) {
      return new ReplyKeyboardRemove(raw['remove_keyboard'], raw['selective'] ? raw['selective'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          remove_keyboard: this.removeKeyboard ? this.removeKeyboard : undefined, 
          selective: this.selective ? this.selective : undefined
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

module.exports = ReplyKeyboardRemove