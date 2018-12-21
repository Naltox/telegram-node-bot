'use strict'

/**
 * This object represents a point on the map.
 */

class Location {
   /**
    *
    * @param {number} longitude
    * @param {number} latitude
   */
   constructor(longitude, latitude) {
       this._longitude = longitude
       this._latitude = latitude
   }

   /**
    * Longitude as defined by sender
    * @returns {number}
   */
   get longitude() {
       return this._longitude
   }

   /**
    * Latitude as defined by sender
    * @returns {number}
   */
   get latitude() {
       return this._latitude
   }

   /**
    *
    * @param {Object} raw
    * @returns {Location}
    */
   static deserialize(raw) {
      return new Location(raw['longitude'], raw['latitude'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          longitude: this.longitude ? this.longitude : undefined, 
          latitude: this.latitude ? this.latitude : undefined
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

module.exports = Location