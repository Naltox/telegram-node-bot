'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a voice recording in an .ogg container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message.
 */

class InlineQueryResultVoice extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} voiceUrl
    * @param {string} title
    * @param {string|null} [caption]
    * @param {number|null} [voiceDuration]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     voiceUrl, 
     title, 
     caption, 
     voiceDuration, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._voiceUrl = voiceUrl
       this._title = title
       this._caption = caption
       this._voiceDuration = voiceDuration
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be voice
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
    * A valid URL for the voice recording
    * @returns {string}
   */
   get voiceUrl() {
       return this._voiceUrl
   }

   /**
    * Recording title
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
    * Recording duration in seconds
    * @returns {number|null}
   */
   get voiceDuration() {
       return this._voiceDuration
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the voice recording
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultVoice}
    */
   static deserialize(raw) {
      return new InlineQueryResultVoice(
          raw['type'], 
          raw['id'], 
          raw['voice_url'], 
          raw['title'], 
          raw['caption'] ? raw['caption'] : null, 
          raw['voice_duration'] ? raw['voice_duration'] : null, 
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
          voice_url: this.voiceUrl ? this.voiceUrl : undefined, 
          title: this.title ? this.title : undefined, 
          caption: this.caption ? this.caption : undefined, 
          voice_duration: this.voiceDuration ? this.voiceDuration : undefined, 
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

module.exports = InlineQueryResultVoice