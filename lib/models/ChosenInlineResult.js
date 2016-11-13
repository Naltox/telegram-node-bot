'use strict'

const User = require('./User')
const Location = require('./Location')

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner. 
 */

class ChosenInlineResult {
   /**
    *
    * @param {string} resultId
    * @param {User} from
    * @param {Location|null} [location]
    * @param {string|null} [inlineMessageId]
    * @param {string} query
   */
   constructor(resultId, from, location, inlineMessageId, query) {
       this._resultId = resultId
       this._from = from
       this._location = location
       this._inlineMessageId = inlineMessageId
       this._query = query
   }

   /**
    * The unique identifier for the result that was chosen
    * @returns {string}
   */
   get resultId() {
       return this._resultId
   }

   /**
    * The user that chose the result
    * @returns {User}
   */
   get from() {
       return this._from
   }

   /**
    * Sender location, only for bots that require user location
    * @returns {Location|null}
   */
   get location() {
       return this._location
   }

   /**
    * Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message.
    * @returns {string|null}
   */
   get inlineMessageId() {
       return this._inlineMessageId
   }

   /**
    * The query that was used to obtain the result
    * @returns {string}
   */
   get query() {
       return this._query
   }

   /**
    *
    * @param {Object} raw
    * @returns {ChosenInlineResult}
    */
   static deserialize(raw) {
      return new ChosenInlineResult(
          raw['result_id'], 
          raw['from'] ? User.deserialize(raw['from']) : null, 
          raw['location'] ? Location.deserialize(raw['location']) : null, 
          raw['inline_message_id'] ? raw['inline_message_id'] : null, 
          raw['query']
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          result_id: this.resultId ? this.resultId : undefined, 
          from: this.from ? this.from.serialize() : undefined, 
          location: this.location ? this.location.serialize() : undefined, 
          inline_message_id: this.inlineMessageId ? this.inlineMessageId : undefined, 
          query: this.query ? this.query : undefined
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

module.exports = ChosenInlineResult