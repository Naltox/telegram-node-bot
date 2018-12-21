'use strict'

const EncryptedPassportElement = require('./EncryptedPassportElement')
const EncryptedCredentials = require('./EncryptedCredentials')

/**
 * Contains information about Telegram Passport data shared with the bot by the user.
 */

class PassportData {
   /**
    *
    * @param {EncryptedPassportElement[]} data
    * @param {EncryptedCredentials} credentials
   */
   constructor(data, credentials) {
       this._data = data
       this._credentials = credentials
   }

   /**
    * Array with information about documents and other Telegram Passport elements that was shared with the bot
    * @returns {EncryptedPassportElement[]}
   */
   get data() {
       return this._data
   }

   /**
    * Encrypted credentials required to decrypt the data
    * @returns {EncryptedCredentials}
   */
   get credentials() {
       return this._credentials
   }

   /**
    *
    * @param {Object} raw
    * @returns {PassportData}
    */
   static deserialize(raw) {
      return new PassportData(raw['data'] ? raw['data'].map(item => EncryptedPassportElement.deserialize(item)) : null, raw['credentials'] ? EncryptedCredentials.deserialize(raw['credentials']) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          data: this.data ? this.data.map(item => item.serialize()) : undefined, 
          credentials: this.credentials ? this.credentials.serialize() : undefined
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

module.exports = PassportData