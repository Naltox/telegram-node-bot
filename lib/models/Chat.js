'use strict'

/**
 * This object represents a chat.
 */

class Chat {
   /**
    *
    * @param {number} id
    * @param {string} type
    * @param {string|null} [title]
    * @param {string|null} [username]
    * @param {string|null} [firstName]
    * @param {string|null} [lastName]
    * @param {boolean|null} [allMembersAreAdministrators]
   */
   constructor(
     id, 
     type, 
     title, 
     username, 
     firstName, 
     lastName, 
     allMembersAreAdministrators
   ) {
       this._id = id
       this._type = type
       this._title = title
       this._username = username
       this._firstName = firstName
       this._lastName = lastName
       this._allMembersAreAdministrators = allMembersAreAdministrators
   }

   /**
    * Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
    * @returns {number}
   */
   get id() {
       return this._id
   }

   /**
    * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Title, for supergroups, channels and group chats
    * @returns {string|null}
   */
   get title() {
       return this._title
   }

   /**
    * Username, for private chats, supergroups and channels if available
    * @returns {string|null}
   */
   get username() {
       return this._username
   }

   /**
    * First name of the other party in a private chat
    * @returns {string|null}
   */
   get firstName() {
       return this._firstName
   }

   /**
    * Last name of the other party in a private chat
    * @returns {string|null}
   */
   get lastName() {
       return this._lastName
   }

   /**
    * True if a group has ‘All Members Are Admins’ enabled.
    * @returns {boolean|null}
   */
   get allMembersAreAdministrators() {
       return this._allMembersAreAdministrators
   }

   /**
    *
    * @param {Object} raw
    * @returns {Chat}
    */
   static deserialize(raw) {
      return new Chat(
          raw['id'], 
          raw['type'], 
          raw['title'] ? raw['title'] : null, 
          raw['username'] ? raw['username'] : null, 
          raw['first_name'] ? raw['first_name'] : null, 
          raw['last_name'] ? raw['last_name'] : null, 
          raw['all_members_are_administrators'] ? raw['all_members_are_administrators'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          type: this.type ? this.type : undefined, 
          title: this.title ? this.title : undefined, 
          username: this.username ? this.username : undefined, 
          first_name: this.firstName ? this.firstName : undefined, 
          last_name: this.lastName ? this.lastName : undefined, 
          all_members_are_administrators: this.allMembersAreAdministrators ? this.allMembersAreAdministrators : undefined
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

module.exports = Chat