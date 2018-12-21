'use strict'

const ChatPhoto = require('./ChatPhoto')
const Message = require('./Message')

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
    * @param {ChatPhoto|null} [photo]
    * @param {string|null} [description]
    * @param {string|null} [inviteLink]
    * @param {Message|null} [pinnedMessage]
    * @param {string|null} [stickerSetName]
    * @param {boolean|null} [canSetStickerSet]
   */
   constructor(
     id, 
     type, 
     title, 
     username, 
     firstName, 
     lastName, 
     allMembersAreAdministrators, 
     photo, 
     description, 
     inviteLink, 
     pinnedMessage, 
     stickerSetName, 
     canSetStickerSet
   ) {
       this._id = id
       this._type = type
       this._title = title
       this._username = username
       this._firstName = firstName
       this._lastName = lastName
       this._allMembersAreAdministrators = allMembersAreAdministrators
       this._photo = photo
       this._description = description
       this._inviteLink = inviteLink
       this._pinnedMessage = pinnedMessage
       this._stickerSetName = stickerSetName
       this._canSetStickerSet = canSetStickerSet
   }

   /**
    * Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
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
    * Chat photo. Returned only in getChat.
    * @returns {ChatPhoto|null}
   */
   get photo() {
       return this._photo
   }

   /**
    * Description, for supergroups and channel chats. Returned only in getChat.
    * @returns {string|null}
   */
   get description() {
       return this._description
   }

   /**
    * Chat invite link, for supergroups and channel chats. Returned only in getChat.
    * @returns {string|null}
   */
   get inviteLink() {
       return this._inviteLink
   }

   /**
    * Pinned message, for supergroups and channel chats. Returned only in getChat.
    * @returns {Message|null}
   */
   get pinnedMessage() {
       return this._pinnedMessage
   }

   /**
    * For supergroups, name of group sticker set. Returned only in getChat.
    * @returns {string|null}
   */
   get stickerSetName() {
       return this._stickerSetName
   }

   /**
    * True, if the bot can change the group sticker set. Returned only in getChat.
    * @returns {boolean|null}
   */
   get canSetStickerSet() {
       return this._canSetStickerSet
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
          raw['all_members_are_administrators'] ? raw['all_members_are_administrators'] : null, 
          raw['photo'] ? ChatPhoto.deserialize(raw['photo']) : null, 
          raw['description'] ? raw['description'] : null, 
          raw['invite_link'] ? raw['invite_link'] : null, 
          raw['pinned_message'] ? Message.deserialize(raw['pinned_message']) : null, 
          raw['sticker_set_name'] ? raw['sticker_set_name'] : null, 
          raw['can_set_sticker_set'] ? raw['can_set_sticker_set'] : null
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
          all_members_are_administrators: this.allMembersAreAdministrators ? this.allMembersAreAdministrators : undefined, 
          photo: this.photo ? this.photo.serialize() : undefined, 
          description: this.description ? this.description : undefined, 
          invite_link: this.inviteLink ? this.inviteLink : undefined, 
          pinned_message: this.pinnedMessage ? this.pinnedMessage.serialize() : undefined, 
          sticker_set_name: this.stickerSetName ? this.stickerSetName : undefined, 
          can_set_sticker_set: this.canSetStickerSet ? this.canSetStickerSet : undefined
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