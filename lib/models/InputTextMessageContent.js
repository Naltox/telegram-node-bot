'use strict'

const InputMessageContent = require('./InputMessageContent')
/**
 * Represents the content of a text message to be sent as the result of an inline query. 
 */

class InputTextMessageContent extends InputMessageContent {
   /**
    *
    * @param {string} messageText
    * @param {string|null} [parseMode]
    * @param {boolean|null} [disableWebPagePreview]
   */
   constructor(messageText, parseMode, disableWebPagePreview) {
       super()
       this._messageText = messageText
       this._parseMode = parseMode
       this._disableWebPagePreview = disableWebPagePreview
   }

   /**
    * Text of the message to be sent, 1-4096 characters
    * @returns {string}
   */
   get messageText() {
       return this._messageText
   }

   /**
    * Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
    * @returns {string|null}
   */
   get parseMode() {
       return this._parseMode
   }

   /**
    * Disables link previews for links in the sent message
    * @returns {boolean|null}
   */
   get disableWebPagePreview() {
       return this._disableWebPagePreview
   }

   /**
    *
    * @param {Object} raw
    * @returns {InputTextMessageContent}
    */
   static deserialize(raw) {
      return new InputTextMessageContent(raw['message_text'], raw['parse_mode'] ? raw['parse_mode'] : null, raw['disable_web_page_preview'] ? raw['disable_web_page_preview'] : null)
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          message_text: this.messageText ? this.messageText : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined, 
          disable_web_page_preview: this.disableWebPagePreview ? this.disableWebPagePreview : undefined
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

module.exports = InputTextMessageContent