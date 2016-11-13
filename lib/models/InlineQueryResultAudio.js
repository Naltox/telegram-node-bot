'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to an mp3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.
 */

class InlineQueryResultAudio extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} audioUrl
    * @param {string} title
    * @param {string|null} [caption]
    * @param {string|null} [performer]
    * @param {number|null} [audioDuration]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     audioUrl, 
     title, 
     caption, 
     performer, 
     audioDuration, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._audioUrl = audioUrl
       this._title = title
       this._caption = caption
       this._performer = performer
       this._audioDuration = audioDuration
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be audio
    * @returns {string}
   */
   get type() {
       return this._type
   }

   /**
    * Unique identifier for this result, 1-64 bytes
    * @returns {string}
   */
   get id() {
       return this._id
   }

   /**
    * A valid URL for the audio file
    * @returns {string}
   */
   get audioUrl() {
       return this._audioUrl
   }

   /**
    * Title
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Caption, 0-200 characters
    * @returns {string|null}
   */
   get caption() {
       return this._caption
   }

   /**
    * Performer
    * @returns {string|null}
   */
   get performer() {
       return this._performer
   }

   /**
    * Audio duration in seconds
    * @returns {number|null}
   */
   get audioDuration() {
       return this._audioDuration
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the audio
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultAudio}
    */
   static deserialize(raw) {
      return new InlineQueryResultAudio(
          raw['type'], 
          raw['id'], 
          raw['audio_url'], 
          raw['title'], 
          raw['caption'] ? raw['caption'] : null, 
          raw['performer'] ? raw['performer'] : null, 
          raw['audio_duration'] ? raw['audio_duration'] : null, 
          raw['reply_markup'] ? InlineKeyboardMarkup.deserialize(raw['reply_markup']) : null, 
          raw['input_message_content'] ? InputMessageContent.deserialize(raw['input_message_content']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          type: this.type ? this.type : undefined, 
          id: this.id ? this.id : undefined, 
          audio_url: this.audioUrl ? this.audioUrl : undefined, 
          title: this.title ? this.title : undefined, 
          caption: this.caption ? this.caption : undefined, 
          performer: this.performer ? this.performer : undefined, 
          audio_duration: this.audioDuration ? this.audioDuration : undefined, 
          reply_markup: this.replyMarkup ? this.replyMarkup.serialize() : undefined, 
          input_message_content: this.inputMessageContent ? this.inputMessageContent.serialize() : undefined
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

module.exports = InlineQueryResultAudio