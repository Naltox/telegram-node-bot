'use strict'

/**
 * This object describes the position on faces where a mask should be placed by default.
 */

class MaskPosition {
   /**
    *
    * @param {string} point
    * @param {number} xShift
    * @param {number} yShift
    * @param {number} scale
   */
   constructor(point, xShift, yShift, scale) {
       this._point = point
       this._xShift = xShift
       this._yShift = yShift
       this._scale = scale
   }

   /**
    * The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”.
    * @returns {string}
   */
   get point() {
       return this._point
   }

   /**
    * Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.
    * @returns {number}
   */
   get xShift() {
       return this._xShift
   }

   /**
    * Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.
    * @returns {number}
   */
   get yShift() {
       return this._yShift
   }

   /**
    * Mask scaling coefficient. For example, 2.0 means double size.
    * @returns {number}
   */
   get scale() {
       return this._scale
   }

   /**
    *
    * @param {Object} raw
    * @returns {MaskPosition}
    */
   static deserialize(raw) {
      return new MaskPosition(raw['point'], raw['x_shift'], raw['y_shift'], raw['scale'])
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          point: this.point ? this.point : undefined, 
          x_shift: this.xShift ? this.xShift : undefined, 
          y_shift: this.yShift ? this.yShift : undefined, 
          scale: this.scale ? this.scale : undefined
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

module.exports = MaskPosition