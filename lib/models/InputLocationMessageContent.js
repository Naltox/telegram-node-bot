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
    * @param {number|null} [livePeriod]
   */
   constructor(latitude, longitude, livePeriod) {
       super()
       this._latitude = latitude
       this._longitude = longitude
       this._livePeriod = livePeriod
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
    * Period in seconds for which the location can be updated, should be between 60 and 86400.
    * @returns {number|null}
   */
   get livePeriod() {
       return this._livePeriod
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputLocationMessageContent}
    */
   static deserialize(raw) {
      return new InputLocationMessageContent(raw['latitude'], raw['longitude'], raw['live_period'] ? raw['live_period'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          latitude: this.latitude ? this.latitude : undefined, 
          longitude: this.longitude ? this.longitude : undefined, 
          live_period: this.livePeriod ? this.livePeriod : undefined
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