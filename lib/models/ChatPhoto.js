'use strict'

/**
 * This object represents a chat photo.
 */

class ChatPhoto {
   /**
    *
    * @param {string} smallFileId
    * @param {string} bigFileId
   */
   constructor(smallFileId, bigFileId) {
       this._smallFileId = smallFileId
       this._bigFileId = bigFileId
   }

   /**
    * Unique file identifier of small (160x160) chat photo. This file_id can be used only for photo download.
    * @returns {string}
   */
   get smallFileId() {
       return this._smallFileId
   }

   /**
    * Unique file identifier of big (640x640) chat photo. This file_id can be used only for photo download.
    * @returns {string}
   */
   get bigFileId() {
       return this._bigFileId
   }

   /**
    *
    * @param {Object} raw
    * @returns {ChatPhoto}
    */
   static deserialize(raw) {
      return new ChatPhoto(raw['small_file_id'], raw['big_file_id'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          small_file_id: this.smallFileId ? this.smallFileId : undefined, 
          big_file_id: this.bigFileId ? this.bigFileId : undefined
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

module.exports = ChatPhoto