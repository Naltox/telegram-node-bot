'use strict'

const PhotoSize = require('./PhotoSize')
const MessageEntity = require('./MessageEntity')
const Animation = require('./Animation')

/**
 * This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 */

class Game {
   /**
    *
    * @param {string} title
    * @param {string} description
    * @param {PhotoSize[]} photo
    * @param {string|null} [text]
    * @param {MessageEntity[]|null} [textEntities]
    * @param {Animation|null} [animation]
   */
   constructor(title, description, photo, text, textEntities, animation) {
       this._title = title
       this._description = description
       this._photo = photo
       this._text = text
       this._textEntities = textEntities
       this._animation = animation
   }

   /**
    * Title of the game
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Description of the game
    * @returns {string}
   */
   get description() {
       return this._description
   }

   /**
    * Photo that will be displayed in the game message in chats.
    * @returns {PhotoSize[]}
   */
   get photo() {
       return this._photo
   }

   /**
    * Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.
    * @returns {string|null}
   */
   get text() {
       return this._text
   }

   /**
    * Special entities that appear in text, such as usernames, URLs, bot commands, etc.
    * @returns {MessageEntity[]|null}
   */
   get textEntities() {
       return this._textEntities
   }

   /**
    * Animation that will be displayed in the game message in chats. Upload via BotFather
    * @returns {Animation|null}
   */
   get animation() {
       return this._animation
   }

   /**
    *
    * @param {Object} raw
    * @returns {Game}
    */
   static deserialize(raw) {
      return new Game(
          raw['title'], 
          raw['description'], 
          raw['photo'] ? raw['photo'].map(item => PhotoSize.deserialize(item)) : null, 
          raw['text'] ? raw['text'] : null, 
          raw['text_entities'] ? raw['text_entities'].map(item => MessageEntity.deserialize(item)) : null, 
          raw['animation'] ? Animation.deserialize(raw['animation']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          title: this.title ? this.title : undefined, 
          description: this.description ? this.description : undefined, 
          photo: this.photo ? this.photo.map(item => item.serialize()) : undefined, 
          text: this.text ? this.text : undefined, 
          text_entities: this.textEntities ? this.textEntities.map(item => item.serialize()) : undefined, 
          animation: this.animation ? this.animation.serialize() : undefined
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

module.exports = Game