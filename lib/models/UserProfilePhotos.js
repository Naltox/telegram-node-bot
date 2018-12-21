'use strict'

const PhotoSize = require('./PhotoSize')

/**
 * This object represent a user's profile pictures.
 */

class UserProfilePhotos {
   /**
    *
    * @param {number} totalCount
    * @param {PhotoSize[][]} photos
   */
   constructor(totalCount, photos) {
       this._totalCount = totalCount
       this._photos = photos
   }

   /**
    * Total number of profile pictures the target user has
    * @returns {number}
   */
   get totalCount() {
       return this._totalCount
   }

   /**
    * Requested profile pictures (in up to 4 sizes each)
    * @returns {PhotoSize[][]}
   */
   get photos() {
       return this._photos
   }

   /**
    *
    * @param {Object} raw
    * @returns {UserProfilePhotos}
    */
   static deserialize(raw) {
      return new UserProfilePhotos(raw['total_count'], raw['photos'] ? raw['photos'].map(arr => arr.map(item => PhotoSize.deserialize(item))) : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          total_count: this.totalCount ? this.totalCount : undefined, 
          photos: this.photos ? this.photos.map(arr => arr.map(item => item.serialize())) : undefined
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

module.exports = UserProfilePhotos