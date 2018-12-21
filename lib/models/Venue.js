'use strict'

const Location = require('./Location')

/**
 * This object represents a venue.
 */

class Venue {
   /**
    *
    * @param {Location} location
    * @param {string} title
    * @param {string} address
    * @param {string|null} [foursquareId]
    * @param {string|null} [foursquareType]
   */
   constructor(location, title, address, foursquareId, foursquareType) {
       this._location = location
       this._title = title
       this._address = address
       this._foursquareId = foursquareId
       this._foursquareType = foursquareType
   }

   /**
    * Venue location
    * @returns {Location}
   */
   get location() {
       return this._location
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
    * Foursquare identifier of the venue
    * @returns {string|null}
   */
   get foursquareId() {
       return this._foursquareId
   }

   /**
    * Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
    * @returns {string|null}
   */
   get foursquareType() {
       return this._foursquareType
   }

   /**
    *
    * @param {Object} raw
    * @returns {Venue}
    */
   static deserialize(raw) {
      return new Venue(
          raw['location'] ? Location.deserialize(raw['location']) : null, 
          raw['title'], 
          raw['address'], 
          raw['foursquare_id'] ? raw['foursquare_id'] : null, 
          raw['foursquare_type'] ? raw['foursquare_type'] : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          location: this.location ? this.location.serialize() : undefined, 
          title: this.title ? this.title : undefined, 
          address: this.address ? this.address : undefined, 
          foursquare_id: this.foursquareId ? this.foursquareId : undefined, 
          foursquare_type: this.foursquareType ? this.foursquareType : undefined
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

module.exports = Venue