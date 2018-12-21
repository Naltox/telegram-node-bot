'use strict'

/**
 * Contains data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes.
 */

class EncryptedCredentials {
   /**
    *
    * @param {string} data
    * @param {string} hash
    * @param {string} secret
   */
   constructor(data, hash, secret) {
       this._data = data
       this._hash = hash
       this._secret = secret
   }

   /**
    * Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication
    * @returns {string}
   */
   get data() {
       return this._data
   }

   /**
    * Base64-encoded data hash for data authentication
    * @returns {string}
   */
   get hash() {
       return this._hash
   }

   /**
    * Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption
    * @returns {string}
   */
   get secret() {
       return this._secret
   }

   /**
    *
    * @param {Object} raw
    * @returns {EncryptedCredentials}
    */
   static deserialize(raw) {
      return new EncryptedCredentials(raw['data'], raw['hash'], raw['secret'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          data: this.data ? this.data : undefined, 
          hash: this.hash ? this.hash : undefined, 
          secret: this.secret ? this.secret : undefined
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

module.exports = EncryptedCredentials