'use strict'

/**
 * Contains information about the current status of a webhook.
 */

class WebhookInfo {
   /**
    *
    * @param {string} url
    * @param {boolean} hasCustomCertificate
    * @param {number} pendingUpdateCount
    * @param {number|null} [lastErrorDate]
    * @param {string|null} [lastErrorMessage]
   */
   constructor(url, hasCustomCertificate, pendingUpdateCount, lastErrorDate, lastErrorMessage) {
       this._url = url
       this._hasCustomCertificate = hasCustomCertificate
       this._pendingUpdateCount = pendingUpdateCount
       this._lastErrorDate = lastErrorDate
       this._lastErrorMessage = lastErrorMessage
   }

   /**
    * Webhook URL, may be empty if webhook is not set up
    * @returns {string}
   */
   get url() {
       return this._url
   }

   /**
    * True, if a custom certificate was provided for webhook certificate checks
    * @returns {boolean}
   */
   get hasCustomCertificate() {
       return this._hasCustomCertificate
   }

   /**
    * Number of updates awaiting delivery
    * @returns {number}
   */
   get pendingUpdateCount() {
       return this._pendingUpdateCount
   }

   /**
    * Unix time for the most recent error that happened when trying to deliver an update via webhook
    * @returns {number|null}
   */
   get lastErrorDate() {
       return this._lastErrorDate
   }

   /**
    * Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook
    * @returns {string|null}
   */
   get lastErrorMessage() {
       return this._lastErrorMessage
   }

   /**
    *
    * @param {Object} raw
    * @returns {WebhookInfo}
    */
   static deserialize(raw) {
      return new WebhookInfo(
          raw['url'], 
          raw['has_custom_certificate'], 
          raw['pending_update_count'], 
          raw['last_error_date'] ? raw['last_error_date'] : null, 
          raw['last_error_message'] ? raw['last_error_message'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          url: this.url ? this.url : undefined, 
          has_custom_certificate: this.hasCustomCertificate ? this.hasCustomCertificate : undefined, 
          pending_update_count: this.pendingUpdateCount ? this.pendingUpdateCount : undefined, 
          last_error_date: this.lastErrorDate ? this.lastErrorDate : undefined, 
          last_error_message: this.lastErrorMessage ? this.lastErrorMessage : undefined
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

module.exports = WebhookInfo