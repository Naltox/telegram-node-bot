'use strict'

const KeyboardButton = require('./KeyboardButton')

/**
 * This object represents a custom keyboard with reply options (see Introduction to bots for details and examples).
 */

class ReplyKeyboardMarkup {
   /**
    *
    * @param {KeyboardButton[][]} keyboard
    * @param {boolean|null} [resizeKeyboard]
    * @param {boolean|null} [oneTimeKeyboard]
    * @param {boolean|null} [selective]
   */
   constructor(keyboard, resizeKeyboard, oneTimeKeyboard, selective) {
       this._keyboard = keyboard
       this._resizeKeyboard = resizeKeyboard
       this._oneTimeKeyboard = oneTimeKeyboard
       this._selective = selective
   }

   /**
    * Array of button rows, each represented by an Array of KeyboardButton objects
    * @returns {KeyboardButton[][]}
   */
   get keyboard() {
       return this._keyboard
   }

   /**
    * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard.
    * @returns {boolean|null}
   */
   get resizeKeyboard() {
       return this._resizeKeyboard
   }

   /**
    * Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false.
    * @returns {boolean|null}
   */
   get oneTimeKeyboard() {
       return this._oneTimeKeyboard
   }

   /**
    * Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.Example: A user requests to change the bot‘s language, bot replies to the request with a keyboard to select the new language. Other users in the group don’t see the keyboard.
    * @returns {boolean|null}
   */
   get selective() {
       return this._selective
   }

   /**
    *
    * @param {Object} raw
    * @returns {ReplyKeyboardMarkup}
    */
   static deserialize(raw) {
      return new ReplyKeyboardMarkup(raw['keyboard'] ? raw['keyboard'].map(arr => arr.map(item => KeyboardButton.deserialize(item))) : null, raw['resize_keyboard'] ? raw['resize_keyboard'] : null, raw['one_time_keyboard'] ? raw['one_time_keyboard'] : null, raw['selective'] ? raw['selective'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          keyboard: this.keyboard ? this.keyboard.map(arr => arr.map(item => item.serialize())) : undefined, 
          resize_keyboard: this.resizeKeyboard ? this.resizeKeyboard : undefined, 
          one_time_keyboard: this.oneTimeKeyboard ? this.oneTimeKeyboard : undefined, 
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

module.exports = ReplyKeyboardMarkup