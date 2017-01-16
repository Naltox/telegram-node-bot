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
   */
   constructor(location, title, address, foursquareId) {
       this._location = location
       this._title = title
       this._address = address
       this._foursquareId = foursquareId
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
    *
    * @param {Object} raw
    * @returns {Venue}
    */
   static deserialize(raw) {
      return new Venue(raw['location'] ? Location.deserialize(raw['location']) : null, raw['title'], raw['address'], raw['foursquare_id'] ? raw['foursquare_id'] : null)
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

module.exports = Venue