'use strict'

const User = require('./User')
const Location = require('./Location')

/**
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 */

class InlineQuery {
   /**
    *
    * @param {string} id
    * @param {User} from
    * @param {Location|null} [location]
    * @param {string} query
    * @param {string} offset
   */
   constructor(id, from, location, query, offset) {
       this._id = id
       this._from = from
       this._location = location
       this._query = query
       this._offset = offset
   }

   /**
    * Unique identifier for this query
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * Sender
    * @returns {User}
   */
   get from() {
       return this._from
   }

   /**
    * Sender location, only for bots that request user location
    * @returns {Location|null}
   */
   get location() {
       return this._location
   }

   /**
    * Text of the query (up to 512 characters)
    * @returns {string}
   */
   get query() {
       return this._query
   }

   /**
    * Offset of the results to be returned, can be controlled by the bot
    * @returns {string}
   */
   get offset() {
       return this._offset
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQuery}
    */
   static deserialize(raw) {
      return new InlineQuery(
          raw['id'], 
          raw['from'] ? User.deserialize(raw['from']) : null, 
          raw['location'] ? Location.deserialize(raw['location']) : null, 
          raw['query'], 
          raw['offset']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          id: this.id ? this.id : undefined, 
          from: this.from ? this.from.serialize() : undefined, 
          location: this.location ? this.location.serialize() : undefined, 
          query: this.query ? this.query : undefined, 
          offset: this.offset ? this.offset : undefined
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

module.exports = InlineQuery