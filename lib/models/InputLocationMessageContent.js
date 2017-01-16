'use strict'

const InputMessageContent = require('./InputMessageContent')
/**
 * Represents the content of a location message to be sent as the result of an inline query. 
 */

class InputLocationMessageContent extends InputMessageContent {
   /**
    *
    * @param {number} latitude
    * @param {number} longitude
   */
   constructor(latitude, longitude) {
       super()
       this._latitude = latitude
       this._longitude = longitude
   }

   /**
    * Latitude of the location in degrees
    * @returns {number}
   */
   get latitude() {
       return this._latitude
   }

   /**
    * Longitude of the location in degrees
    * @returns {number}
   */
   get longitude() {
       return this._longitude
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputLocationMessageContent}
    */
   static deserialize(raw) {
      return new InputLocationMessageContent(raw['latitude'], raw['longitude'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          latitude: this.latitude ? this.latitude : undefined, 
          longitude: this.longitude ? this.longitude : undefined
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

module.exports = InputLocationMessageContent