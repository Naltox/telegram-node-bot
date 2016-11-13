'use strict'

const User = require('./User')

/**
 * This object represents one row of the high scores table for a game.
 */

class GameHighScore {
   /**
    *
    * @param {number} position
    * @param {User} user
    * @param {number} score
   */
   constructor(position, user, score) {
       this._position = position
       this._user = user
       this._score = score
   }

   /**
    * Position in high score table for the game
    * @returns {number}
   */
   get position() {
       return this._position
   }

   /**
    * User
    * @returns {User}
   */
   get user() {
       return this._user
   }

   /**
    * Score
    * @returns {number}
   */
   get score() {
       return this._score
   }

   /**
    *
    * @param {Object} raw
    * @returns {GameHighScore}
    */
   static deserialize(raw) {
      return new GameHighScore(raw['position'], raw['user'] ? User.deserialize(raw['user']) : null, raw['score'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          position: this.position ? this.position : undefined, 
          user: this.user ? this.user.serialize() : undefined, 
          score: this.score ? this.score : undefined
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

module.exports = GameHighScore