'use strict'

const User = require('./User')

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. 
 */

class MessageEntity {
   /**
    *
    * @param {string} type
    * @param {number} offset
    * @param {number} length
    * @param {string|null} [url]
    * @param {User|null} [user]
   */
   constructor(type, offset, length, url, user) {
       this._type = type
       this._offset = offset
       this._length = length
       this._url = url
       this._user = user
   }

   /**
    * Type of the entity. Can be mention (@username), hashtag, cashtag, bot_command, url, email, phone_number, bold (bold text), italic (italic text), code (monowidth string), pre (monowidth block), text_link (for clickable text URLs), text_mention (for users without usernames)
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Offset in UTF-16 code units to the start of the entity
    * @returns {number}
   */
   get offset() {
       return this._offset
   }

   /**
    * Length of the entity in UTF-16 code units
    * @returns {number}
   */
   get length() {
       return this._length
   }

   /**
    * For “text_link” only, url that will be opened after user taps on the text
    * @returns {string|null}
   */
   get url() {
       return this._url
   }

   /**
    * For “text_mention” only, the mentioned user
    * @returns {User|null}
   */
   get user() {
       return this._user
   }

   /**
    *
    * @param {Object} raw
    * @returns {MessageEntity}
    */
   static deserialize(raw) {
      return new MessageEntity(
          raw['type'], 
          raw['offset'], 
          raw['length'], 
          raw['url'] ? raw['url'] : null, 
          raw['user'] ? User.deserialize(raw['user']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          offset: this.offset ? this.offset : undefined, 
          length: this.length ? this.length : undefined, 
          url: this.url ? this.url : undefined, 
          user: this.user ? this.user.serialize() : undefined
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

module.exports = MessageEntity