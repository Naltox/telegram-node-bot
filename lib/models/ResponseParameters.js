'use strict'

/**
 * Contains information about why a request was unsuccessfull.
 */

class ResponseParameters {
   /**
    *
    * @param {number|null} [migrateToChatId]
    * @param {number|null} [retryAfter]
   */
   constructor(migrateToChatId, retryAfter) {
       this._migrateToChatId = migrateToChatId
       this._retryAfter = retryAfter
   }

   /**
    * The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
    * @returns {number|null}
   */
   get migrateToChatId() {
       return this._migrateToChatId
   }

   /**
    * In case of exceeding flood control, the number of seconds left to wait before the request can be repeated
    * @returns {number|null}
   */
   get retryAfter() {
       return this._retryAfter
   }

   /**
    *
    * @param {Object} raw
    * @returns {ResponseParameters}
    */
   static deserialize(raw) {
      return new ResponseParameters(raw['migrate_to_chat_id'] ? raw['migrate_to_chat_id'] : null, raw['retry_after'] ? raw['retry_after'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          migrate_to_chat_id: this.migrateToChatId ? this.migrateToChatId : undefined, 
          retry_after: this.retryAfter ? this.retryAfter : undefined
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

module.exports = ResponseParameters