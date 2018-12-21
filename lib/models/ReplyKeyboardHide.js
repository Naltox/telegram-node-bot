'use strict'

/**
 * Upon receiving a message with this object, Telegram clients will hide the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup).
 */

class ReplyKeyboardHide {
   /**
    *
    * @param {boolean} hideKeyboard
    * @param {boolean|null} [selective]
   */
   constructor(hideKeyboard, selective) {
       this._hideKeyboard = hideKeyboard
       this._selective = selective
   }

   /**
    * Requests clients to hide the custom keyboard
    * @returns {boolean}
   */
   get hideKeyboard() {
       return this._hideKeyboard
   }

   /**
    * Use this parameter if you want to hide keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.Example: A user votes in a poll, bot returns confirmation message in reply to the vote and hides keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
    * @returns {boolean|null}
   */
   get selective() {
       return this._selective
   }

   /**
    *
    * @param {Object} raw
    * @returns {ReplyKeyboardHide}
    */
   static deserialize(raw) {
      return new ReplyKeyboardHide(raw['hide_keyboard'], raw['selective'] ? raw['selective'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          hide_keyboard: this.hideKeyboard ? this.hideKeyboard : undefined, 
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

module.exports = ReplyKeyboardHide