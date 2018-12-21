'use strict'

/**
 * Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes.
 */

class PassportElementErrorDataField {
   /**
    *
    * @param {string} source
    * @param {string} type
    * @param {string} fieldName
    * @param {string} dataHash
    * @param {string} message
   */
   constructor(source, type, fieldName, dataHash, message) {
       this._source = source
       this._type = type
       this._fieldName = fieldName
       this._dataHash = dataHash
       this._message = message
   }

   /**
    * Error source, must be data
    * @returns {string}
   */
   get source() {
       return this._source
   }

   /**
    * The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Name of the data field which has the error
    * @returns {string}
   */
   get fieldName() {
       return this._fieldName
   }

   /**
    * Base64-encoded data hash
    * @returns {string}
   */
   get dataHash() {
       return this._dataHash
   }

   /**
    * Error message
    * @returns {string}
   */
   get message() {
       return this._message
   }

   /**
    *
    * @param {Object} raw
    * @returns {PassportElementErrorDataField}
    */
   static deserialize(raw) {
      return new PassportElementErrorDataField(
          raw['source'], 
          raw['type'], 
          raw['field_name'], 
          raw['data_hash'], 
          raw['message']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          source: this.source ? this.source : undefined, 
          type: this.type ? this.type : undefined, 
          field_name: this.fieldName ? this.fieldName : undefined, 
          data_hash: this.dataHash ? this.dataHash : undefined, 
          message: this.message ? this.message : undefined
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

module.exports = PassportElementErrorDataField