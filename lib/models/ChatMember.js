'use strict'

const User = require('./User')

/**
 * This object contains information about one member of the chat.
 */

class ChatMember {
   /**
    *
    * @param {User} user
    * @param {string} status
   */
   constructor(user, status) {
       this._user = user
       this._status = status
   }

   /**
    * Information about the user
    * @returns {User}
   */
   get user() {
       return this._user
   }

   /**
    * The member's status in the chat. Can be “creator”, “administrator”, “member”, “left” or “kicked”
    * @returns {string}
   */
   get status() {
       return this._status
   }

   /**
    *
    * @param {Object} raw
    * @returns {ChatMember}
    */
   static deserialize(raw) {
      return new ChatMember(raw['user'] ? User.deserialize(raw['user']) : null, raw['status'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          user: this.user ? this.user.serialize() : undefined, 
          status: this.status ? this.status : undefined
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

module.exports = ChatMember