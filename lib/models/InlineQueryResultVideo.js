'use strict'

const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
const InputMessageContent = require('./InputMessageContent')
const InlineQueryResult = require('./InlineQueryResult')
/**
 * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.
 */

class InlineQueryResultVideo extends InlineQueryResult {
   /**
    *
    * @param {string} type
    * @param {string} id
    * @param {string} videoUrl
    * @param {string} mimeType
    * @param {string} thumbUrl
    * @param {string} title
    * @param {string|null} [caption]
    * @param {string|null} [parseMode]
    * @param {number|null} [videoWidth]
    * @param {number|null} [videoHeight]
    * @param {number|null} [videoDuration]
    * @param {string|null} [description]
    * @param {InlineKeyboardMarkup|null} [replyMarkup]
    * @param {InputMessageContent|null} [inputMessageContent]
   */
   constructor(
     type, 
     id, 
     videoUrl, 
     mimeType, 
     thumbUrl, 
     title, 
     caption, 
     parseMode, 
     videoWidth, 
     videoHeight, 
     videoDuration, 
     description, 
     replyMarkup, 
     inputMessageContent
   ) {
       super()
       this._type = type
       this._id = id
       this._videoUrl = videoUrl
       this._mimeType = mimeType
       this._thumbUrl = thumbUrl
       this._title = title
       this._caption = caption
       this._parseMode = parseMode
       this._videoWidth = videoWidth
       this._videoHeight = videoHeight
       this._videoDuration = videoDuration
       this._description = description
       this._replyMarkup = replyMarkup
       this._inputMessageContent = inputMessageContent
   }

   /**
    * Type of the result, must be video
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
    * A valid URL for the embedded video player or video file
    * @returns {string}
   */
   get videoUrl() {
       return this._videoUrl
   }

   /**
    * Mime type of the content of video url, “text/html” or “video/mp4”
    * @returns {string}
   */
   get mimeType() {
       return this._mimeType
   }

   /**
    * URL of the thumbnail (jpeg only) for the video
    * @returns {string}
   */
   get thumbUrl() {
       return this._thumbUrl
   }

   /**
    * Title for the result
    * @returns {string}
   */
   get title() {
       return this._title
   }

   /**
    * Caption of the video to be sent, 0-1024 characters
    * @returns {string|null}
   */
   get caption() {
       return this._caption
   }

   /**
    * Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in the media caption.
    * @returns {string|null}
   */
   get parseMode() {
       return this._parseMode
   }

   /**
    * Video width
    * @returns {number|null}
   */
   get videoWidth() {
       return this._videoWidth
   }

   /**
    * Video height
    * @returns {number|null}
   */
   get videoHeight() {
       return this._videoHeight
   }

   /**
    * Video duration in seconds
    * @returns {number|null}
   */
   get videoDuration() {
       return this._videoDuration
   }

   /**
    * Short description of the result
    * @returns {string|null}
   */
   get description() {
       return this._description
   }

   /**
    * Inline keyboard attached to the message
    * @returns {InlineKeyboardMarkup|null}
   */
   get replyMarkup() {
       return this._replyMarkup
   }

   /**
    * Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video).
    * @returns {InputMessageContent|null}
   */
   get inputMessageContent() {
       return this._inputMessageContent
   }

   /**
    *
    * @param {Object} raw
    * @returns {InlineQueryResultVideo}
    */
   static deserialize(raw) {
      return new InlineQueryResultVideo(
          raw['type'], 
          raw['id'], 
          raw['video_url'], 
          raw['mime_type'], 
          raw['thumb_url'], 
          raw['title'], 
          raw['caption'] ? raw['caption'] : null, 
          raw['parse_mode'] ? raw['parse_mode'] : null, 
          raw['video_width'] ? raw['video_width'] : null, 
          raw['video_height'] ? raw['video_height'] : null, 
          raw['video_duration'] ? raw['video_duration'] : null, 
          raw['description'] ? raw['description'] : null, 
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
          video_url: this.videoUrl ? this.videoUrl : undefined, 
          mime_type: this.mimeType ? this.mimeType : undefined, 
          thumb_url: this.thumbUrl ? this.thumbUrl : undefined, 
          title: this.title ? this.title : undefined, 
          caption: this.caption ? this.caption : undefined, 
          parse_mode: this.parseMode ? this.parseMode : undefined, 
          video_width: this.videoWidth ? this.videoWidth : undefined, 
          video_height: this.videoHeight ? this.videoHeight : undefined, 
          video_duration: this.videoDuration ? this.videoDuration : undefined, 
          description: this.description ? this.description : undefined, 
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

module.exports = InlineQueryResultVideo