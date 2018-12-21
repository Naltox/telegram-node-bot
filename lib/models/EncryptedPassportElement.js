'use strict'

const PassportFile = require('./PassportFile')

/**
 * Contains information about documents or other Telegram Passport elements shared with the bot by the user.
 */

class EncryptedPassportElement {
   /**
    *
    * @param {string} type
    * @param {string|null} [data]
    * @param {string|null} [phoneNumber]
    * @param {string|null} [email]
    * @param {PassportFile[]|null} [files]
    * @param {PassportFile|null} [frontSide]
    * @param {PassportFile|null} [reverseSide]
    * @param {PassportFile|null} [selfie]
    * @param {PassportFile[]|null} [translation]
    * @param {string} hash
   */
   constructor(
     type, 
     data, 
     phoneNumber, 
     email, 
     files, 
     frontSide, 
     reverseSide, 
     selfie, 
     translation, 
     hash
   ) {
       this._type = type
       this._data = data
       this._phoneNumber = phoneNumber
       this._email = email
       this._files = files
       this._frontSide = frontSide
       this._reverseSide = reverseSide
       this._selfie = selfie
       this._translation = translation
       this._hash = hash
   }

   /**
    * Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”.
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Base64-encoded encrypted Telegram Passport element data provided by the user, available for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {string|null}
   */
   get data() {
       return this._data
   }

   /**
    * User's verified phone number, available only for “phone_number” type
    * @returns {string|null}
   */
   get phoneNumber() {
       return this._phoneNumber
   }

   /**
    * User's verified email address, available only for “email” type
    * @returns {string|null}
   */
   get email() {
       return this._email
   }

   /**
    * Array of encrypted files with documents provided by the user, available for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {PassportFile[]|null}
   */
   get files() {
       return this._files
   }

   /**
    * Encrypted file with the front side of the document, provided by the user. Available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {PassportFile|null}
   */
   get frontSide() {
       return this._frontSide
   }

   /**
    * Encrypted file with the reverse side of the document, provided by the user. Available for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {PassportFile|null}
   */
   get reverseSide() {
       return this._reverseSide
   }

   /**
    * Encrypted file with the selfie of the user holding a document, provided by the user; available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {PassportFile|null}
   */
   get selfie() {
       return this._selfie
   }

   /**
    * Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
    * @returns {PassportFile[]|null}
   */
   get translation() {
       return this._translation
   }

   /**
    * Base64-encoded element hash for using in PassportElementErrorUnspecified
    * @returns {string}
   */
   get hash() {
       return this._hash
   }

   /**
    *
    * @param {Object} raw
    * @returns {EncryptedPassportElement}
    */
   static deserialize(raw) {
      return new EncryptedPassportElement(
          raw['type'], 
          raw['data'] ? raw['data'] : null, 
          raw['phone_number'] ? raw['phone_number'] : null, 
          raw['email'] ? raw['email'] : null, 
          raw['files'] ? raw['files'].map(item => PassportFile.deserialize(item)) : null, 
          raw['front_side'] ? PassportFile.deserialize(raw['front_side']) : null, 
          raw['reverse_side'] ? PassportFile.deserialize(raw['reverse_side']) : null, 
          raw['selfie'] ? PassportFile.deserialize(raw['selfie']) : null, 
          raw['translation'] ? raw['translation'].map(item => PassportFile.deserialize(item)) : null, 
          raw['hash']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          data: this.data ? this.data : undefined, 
          phone_number: this.phoneNumber ? this.phoneNumber : undefined, 
          email: this.email ? this.email : undefined, 
          files: this.files ? this.files.map(item => item.serialize()) : undefined, 
          front_side: this.frontSide ? this.frontSide.serialize() : undefined, 
          reverse_side: this.reverseSide ? this.reverseSide.serialize() : undefined, 
          selfie: this.selfie ? this.selfie.serialize() : undefined, 
          translation: this.translation ? this.translation.map(item => item.serialize()) : undefined, 
          hash: this.hash ? this.hash : undefined
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

module.exports = EncryptedPassportElement