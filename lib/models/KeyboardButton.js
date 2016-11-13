'use strict'

/**
 * This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields are mutually exclusive.
 */

class KeyboardButton {
   /**
    *
    * @param {string} text
    * @param {boolean|null} [requestContact]
    * @param {boolean|null} [requestLocation]
   */
   constructor(text, requestContact, requestLocation) {
       this._text = text
       this._requestContact = requestContact
       this._requestLocation = requestLocation
   }

   /**
    * Text of the button. If none of the optional fields are used, it will be sent to the bot as a message when the button is pressed
    * @returns {string}
   */
   get text() {
       return this._text
   }

   /**
    * If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only
    * @returns {boolean|null}
   */
   get requestContact() {
       return this._requestContact
   }

   /**
    * If True, the user's current location will be sent when the button is pressed. Available in private chats only
    * @returns {boolean|null}
   */
   get requestLocation() {
       return this._requestLocation
   }

   /**
    *
    * @param {Object} raw
    * @returns {KeyboardButton}
    */
   static deserialize(raw) {
      return new KeyboardButton(raw['text'], raw['request_contact'] ? raw['request_contact'] : null, raw['request_location'] ? raw['request_location'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          text: this.text ? this.text : undefined, 
          request_contact: this.requestContact ? this.requestContact : undefined, 
          request_location: this.requestLocation ? this.requestLocation : undefined
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

module.exports = KeyboardButton