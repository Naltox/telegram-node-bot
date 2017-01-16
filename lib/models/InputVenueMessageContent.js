'use strict'

const InputMessageContent = require('./InputMessageContent')
/**
 * Represents the content of a venue message to be sent as the result of an inline query. 
 */

class InputVenueMessageContent extends InputMessageContent {
   /**
    *
    * @param {number} latitude
    * @param {number} longitude
    * @param {string} title
    * @param {string} address
    * @param {string|null} [foursquareId]
   */
   constructor(latitude, longitude, title, address, foursquareId) {
       super()
       this._latitude = latitude
       this._longitude = longitude
       this._title = title
       this._address = address
       this._foursquareId = foursquareId
   }

   /**
    * Latitude of the venue in degrees
    * @returns {number}
   */
   get latitude() {
       return this._latitude
   }

   /**
    * Longitude of the venue in degrees
    * @returns {number}
   */
   get longitude() {
       return this._longitude
   }

   /**
    * Name of the venue
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Address of the venue
    * @returns {string}
   */
   get address() {
       return this._address
   }

   /**
    * Foursquare identifier of the venue, if known
    * @returns {string|null}
   */
   get foursquareId() {
       return this._foursquareId
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputVenueMessageContent}
    */
   static deserialize(raw) {
      return new InputVenueMessageContent(
          raw['latitude'], 
          raw['longitude'], 
          raw['title'], 
          raw['address'], 
          raw['foursquare_id'] ? raw['foursquare_id'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          latitude: this.latitude ? this.latitude : undefined, 
          longitude: this.longitude ? this.longitude : undefined, 
          title: this.title ? this.title : undefined, 
          address: this.address ? this.address : undefined, 
          foursquare_id: this.foursquareId ? this.foursquareId : undefined
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

module.exports = InputVenueMessageContent