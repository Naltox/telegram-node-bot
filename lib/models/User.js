'use strict'

/**
 * This object represents a Telegram user or bot.
 */

class User {
   /**
    *
    * @param {number} id
    * @param {boolean} isBot
    * @param {string} firstName
    * @param {string|null} [lastName]
    * @param {string|null} [username]
    * @param {string|null} [languageCode]
   */
   constructor(id, isBot, firstName, lastName, username, languageCode) {
       this._id = id
       this._isBot = isBot
       this._firstName = firstName
       this._lastName = lastName
       this._username = username
       this._languageCode = languageCode
   }

   /**
    * Unique identifier for this user or bot
    * @returns {number}
   */
   get id() {
       return this._id
   }

   /**
    * True, if this user is a bot
    * @returns {boolean}
   */
   get isBot() {
       return this._isBot
   }

   /**
    * User‘s or bot’s first name
    * @returns {string}
   */
   get firstName() {
       return this._firstName
   }

   /**
    * User‘s or bot’s last name
    * @returns {string|null}
   */
   get lastName() {
       return this._lastName
   }

   /**
    * User‘s or bot’s username
    * @returns {string|null}
   */
   get username() {
       return this._username
   }

   /**
    * IETF language tag of the user's language
    * @returns {string|null}
   */
   get languageCode() {
       return this._languageCode
   }

   /**
    *
    * @param {Object} raw
    * @returns {User}
    */
   static deserialize(raw) {
      return new User(
          raw['id'], 
          raw['is_bot'], 
          raw['first_name'], 
          raw['last_name'] ? raw['last_name'] : null, 
          raw['username'] ? raw['username'] : null, 
          raw['language_code'] ? raw['language_code'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          is_bot: this.isBot ? this.isBot : undefined, 
          first_name: this.firstName ? this.firstName : undefined, 
          last_name: this.lastName ? this.lastName : undefined, 
          username: this.username ? this.username : undefined, 
          language_code: this.languageCode ? this.languageCode : undefined
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

module.exports = User