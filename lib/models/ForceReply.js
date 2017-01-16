'use strict'

/**
 * Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot‘s message and tapped ’Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.
 */

class ForceReply {
   /**
    *
    * @param {boolean} forceReply
    * @param {boolean|null} [selective]
   */
   constructor(forceReply, selective) {
       this._forceReply = forceReply
       this._selective = selective
   }

   /**
    * Shows reply interface to the user, as if they manually selected the bot‘s message and tapped ’Reply'
    * @returns {boolean}
   */
   get forceReply() {
       return this._forceReply
   }

   /**
    * Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
    * @returns {boolean|null}
   */
   get selective() {
       return this._selective
   }

   /**
    *
    * @param {Object} raw
    * @returns {ForceReply}
    */
   static deserialize(raw) {
      return new ForceReply(raw['force_reply'], raw['selective'] ? raw['selective'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          force_reply: this.forceReply ? this.forceReply : undefined, 
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

module.exports = ForceReply