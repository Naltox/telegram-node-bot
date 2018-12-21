'use strict'

const User = require('./User')

/**
 * This object contains information about one member of a chat.
 */

class ChatMember {
   /**
    *
    * @param {User} user
    * @param {string} status
    * @param {number|null} [untilDate]
    * @param {boolean|null} [canBeEdited]
    * @param {boolean|null} [canChangeInfo]
    * @param {boolean|null} [canPostMessages]
    * @param {boolean|null} [canEditMessages]
    * @param {boolean|null} [canDeleteMessages]
    * @param {boolean|null} [canInviteUsers]
    * @param {boolean|null} [canRestrictMembers]
    * @param {boolean|null} [canPinMessages]
    * @param {boolean|null} [canPromoteMembers]
    * @param {boolean|null} [canSendMessages]
    * @param {boolean|null} [canSendMediaMessages]
    * @param {boolean|null} [canSendOtherMessages]
    * @param {boolean|null} [canAddWebPagePreviews]
   */
   constructor(
     user, 
     status, 
     untilDate, 
     canBeEdited, 
     canChangeInfo, 
     canPostMessages, 
     canEditMessages, 
     canDeleteMessages, 
     canInviteUsers, 
     canRestrictMembers, 
     canPinMessages, 
     canPromoteMembers, 
     canSendMessages, 
     canSendMediaMessages, 
     canSendOtherMessages, 
     canAddWebPagePreviews
   ) {
       this._user = user
       this._status = status
       this._untilDate = untilDate
       this._canBeEdited = canBeEdited
       this._canChangeInfo = canChangeInfo
       this._canPostMessages = canPostMessages
       this._canEditMessages = canEditMessages
       this._canDeleteMessages = canDeleteMessages
       this._canInviteUsers = canInviteUsers
       this._canRestrictMembers = canRestrictMembers
       this._canPinMessages = canPinMessages
       this._canPromoteMembers = canPromoteMembers
       this._canSendMessages = canSendMessages
       this._canSendMediaMessages = canSendMediaMessages
       this._canSendOtherMessages = canSendOtherMessages
       this._canAddWebPagePreviews = canAddWebPagePreviews
   }

   /**
    * Information about the user
    * @returns {User}
   */
   get user() {
       return this._user
   }

   /**
    * The member's status in the chat. Can be “creator”, “administrator”, “member”, “restricted”, “left” or “kicked”
    * @returns {string}
   */
   get status() {
       return this._status
   }

   /**
    * Restricted and kicked only. Date when restrictions will be lifted for this user, unix time
    * @returns {number|null}
   */
   get untilDate() {
       return this._untilDate
   }

   /**
    * Administrators only. True, if the bot is allowed to edit administrator privileges of that user
    * @returns {boolean|null}
   */
   get canBeEdited() {
       return this._canBeEdited
   }

   /**
    * Administrators only. True, if the administrator can change the chat title, photo and other settings
    * @returns {boolean|null}
   */
   get canChangeInfo() {
       return this._canChangeInfo
   }

   /**
    * Administrators only. True, if the administrator can post in the channel, channels only
    * @returns {boolean|null}
   */
   get canPostMessages() {
       return this._canPostMessages
   }

   /**
    * Administrators only. True, if the administrator can edit messages of other users and can pin messages, channels only
    * @returns {boolean|null}
   */
   get canEditMessages() {
       return this._canEditMessages
   }

   /**
    * Administrators only. True, if the administrator can delete messages of other users
    * @returns {boolean|null}
   */
   get canDeleteMessages() {
       return this._canDeleteMessages
   }

   /**
    * Administrators only. True, if the administrator can invite new users to the chat
    * @returns {boolean|null}
   */
   get canInviteUsers() {
       return this._canInviteUsers
   }

   /**
    * Administrators only. True, if the administrator can restrict, ban or unban chat members
    * @returns {boolean|null}
   */
   get canRestrictMembers() {
       return this._canRestrictMembers
   }

   /**
    * Administrators only. True, if the administrator can pin messages, supergroups only
    * @returns {boolean|null}
   */
   get canPinMessages() {
       return this._canPinMessages
   }

   /**
    * Administrators only. True, if the administrator can add new administrators with a subset of his own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user)
    * @returns {boolean|null}
   */
   get canPromoteMembers() {
       return this._canPromoteMembers
   }

   /**
    * Restricted only. True, if the user can send text messages, contacts, locations and venues
    * @returns {boolean|null}
   */
   get canSendMessages() {
       return this._canSendMessages
   }

   /**
    * Restricted only. True, if the user can send audios, documents, photos, videos, video notes and voice notes, implies can_send_messages
    * @returns {boolean|null}
   */
   get canSendMediaMessages() {
       return this._canSendMediaMessages
   }

   /**
    * Restricted only. True, if the user can send animations, games, stickers and use inline bots, implies can_send_media_messages
    * @returns {boolean|null}
   */
   get canSendOtherMessages() {
       return this._canSendOtherMessages
   }

   /**
    * Restricted only. True, if user may add web page previews to his messages, implies can_send_media_messages
    * @returns {boolean|null}
   */
   get canAddWebPagePreviews() {
       return this._canAddWebPagePreviews
   }

   /**
    *
    * @param {Object} raw
    * @returns {ChatMember}
    */
   static deserialize(raw) {
      return new ChatMember(
          raw['user'] ? User.deserialize(raw['user']) : null, 
          raw['status'], 
          raw['until_date'] ? raw['until_date'] : null, 
          raw['can_be_edited'] ? raw['can_be_edited'] : null, 
          raw['can_change_info'] ? raw['can_change_info'] : null, 
          raw['can_post_messages'] ? raw['can_post_messages'] : null, 
          raw['can_edit_messages'] ? raw['can_edit_messages'] : null, 
          raw['can_delete_messages'] ? raw['can_delete_messages'] : null, 
          raw['can_invite_users'] ? raw['can_invite_users'] : null, 
          raw['can_restrict_members'] ? raw['can_restrict_members'] : null, 
          raw['can_pin_messages'] ? raw['can_pin_messages'] : null, 
          raw['can_promote_members'] ? raw['can_promote_members'] : null, 
          raw['can_send_messages'] ? raw['can_send_messages'] : null, 
          raw['can_send_media_messages'] ? raw['can_send_media_messages'] : null, 
          raw['can_send_other_messages'] ? raw['can_send_other_messages'] : null, 
          raw['can_add_web_page_previews'] ? raw['can_add_web_page_previews'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          user: this.user ? this.user.serialize() : undefined, 
          status: this.status ? this.status : undefined, 
          until_date: this.untilDate ? this.untilDate : undefined, 
          can_be_edited: this.canBeEdited ? this.canBeEdited : undefined, 
          can_change_info: this.canChangeInfo ? this.canChangeInfo : undefined, 
          can_post_messages: this.canPostMessages ? this.canPostMessages : undefined, 
          can_edit_messages: this.canEditMessages ? this.canEditMessages : undefined, 
          can_delete_messages: this.canDeleteMessages ? this.canDeleteMessages : undefined, 
          can_invite_users: this.canInviteUsers ? this.canInviteUsers : undefined, 
          can_restrict_members: this.canRestrictMembers ? this.canRestrictMembers : undefined, 
          can_pin_messages: this.canPinMessages ? this.canPinMessages : undefined, 
          can_promote_members: this.canPromoteMembers ? this.canPromoteMembers : undefined, 
          can_send_messages: this.canSendMessages ? this.canSendMessages : undefined, 
          can_send_media_messages: this.canSendMediaMessages ? this.canSendMediaMessages : undefined, 
          can_send_other_messages: this.canSendOtherMessages ? this.canSendOtherMessages : undefined, 
          can_add_web_page_previews: this.canAddWebPagePreviews ? this.canAddWebPagePreviews : undefined
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